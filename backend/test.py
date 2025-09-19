import geopandas as gpd

# Load GPKG file
gdf = gpd.read_file(".\eez_boundaries_v12.gpkg")

# Check available columns
print(gdf.columns)
print(gdf.head())

# Filter India's EEZ
india_eez = gdf[gdf["ISO_TER1"] == "IND"]

# Save to GeoJSON (easier for mobile app use)
india_eez.to_file("india_eez.geojson", driver="GeoJSON")
print("India EEZ GeoJSON saved.")