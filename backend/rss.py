# app.py
from fastapi import FastAPI, Query, HTTPException
from fastapi.responses import JSONResponse
import httpx, urllib.parse, xml.etree.ElementTree as ET, html, re
from datetime import datetime

app = FastAPI(title="Fishing & Coastal News JSON (India)")

NOMINATIM = "https://nominatim.openstreetmap.org/reverse"
GOOGLE_RSS = "https://news.google.com/rss/search"
HEADERS = {"User-Agent": "FishingCoastalJSON/1.0 (contact: you@example.com)"}

async def reverse_place(lat: float, lon: float) -> str:
    async with httpx.AsyncClient(timeout=10.0, headers=HEADERS) as c:
        r = await c.get(NOMINATIM, params={"format":"json","lat":lat,"lon":lon,"zoom":10,"addressdetails":1})
        if r.status_code != 200: return ""
        addr = r.json().get("address", {})
        for k in ("town","city","county","state","region"): 
            if addr.get(k): return addr[k]
        return ""

async def fetch_google_rss(query: str):
    params = {"q": query, "hl": "en-IN", "gl": "IN", "ceid": "IN:en"}
    async with httpx.AsyncClient(timeout=15.0, headers=HEADERS) as c:
        r = await c.get(GOOGLE_RSS, params=params)
        r.raise_for_status()
        return r.text

def clean_html(s: str) -> str:
    if not s: return ""
    s = html.unescape(s)
    s = re.sub(r"<.*?>", "", s)           # strip tags
    s = re.sub(r"\s+", " ", s).strip()
    return s

def parse_rss_to_json(xml_text: str, feed_title: str):
    root = ET.fromstring(xml_text)
    ch = root.find("channel") or root
    metadata = {
        "feed_title": feed_title or (ch.findtext("title") or ""),
        "feed_link": ch.findtext("link") or "",
        "description": clean_html(ch.findtext("description") or ""),
        "lastBuildDate": ch.findtext("lastBuildDate") or datetime.utcnow().strftime("%a, %d %b %Y %H:%M:%S GMT")
    }
    items = []
    for it in ch.findall("item")[:40]:
        items.append({
            "title": clean_html(it.findtext("title") or ""),
            "link": (it.findtext("link") or "").strip(),
            "description": clean_html(it.findtext("description") or ""),
            "pubDate": (it.findtext("pubDate") or "").strip(),
            "guid": (it.findtext("guid") or "").strip()
        })
    return {"meta": metadata, "items": items}

@app.get("/rss")
async def fishing_rss(lat: float = Query(...), lon: float = Query(...)):
    place = ""
    try:
        place = await reverse_place(lat, lon)
    except Exception:
        place = ""
    search = f"(fishing OR coastal) {place} India" if place else "(fishing OR coastal) India"
    try:
        xml = await fetch_google_rss(search)
    except httpx.HTTPError as e:
        raise HTTPException(status_code=502, detail=f"upstream fetch failed: {e}")
    data = parse_rss_to_json(xml, feed_title=place or "India coastal/fishing")
    return JSONResponse(content=data)
