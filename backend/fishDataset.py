import os
import shutil
import cv2
import albumentations as A
from bing_image_downloader import downloader

# --- Configuration ---

# A curated list of common fish species, with an emphasis on India.
# You can easily add or remove species from these lists.

INDIAN_FISH = [
    'Rohu Fish', 'Catla Fish', 'Hilsa Fish', 'Pomfret Fish', 
    'King Mackerel', 'Indian Salmon', 'Sardine Fish', 'Bombay Duck Fish',
    'Lady Fish', 'Indian Mackerel', 'Reba Carp', 'Singhi Fish'
]

GLOBAL_FISH = [
    'Clownfish', 'Piranha', 'Bluefin Tuna',
    'Salmon Fish', 'Great White Shark', 'Lionfish',
    'Sea Bass', 'Pufferfish', 'Goldfish', 'Mahi-mahi Fish'
]

# Combine lists and ensure no duplicates
FISH_SPECIES = sorted(list(set(INDIAN_FISH + GLOBAL_FISH)))

# Number of base images to download per species
DOWNLOAD_LIMIT = 120

# Number of synthetic variations to create from each downloaded image
AUGMENTATIONS_PER_IMAGE = 10

# Directory for the final dataset
OUTPUT_DIR = 'global_fish_dataset'

# Temporary directory for raw downloaded images
RAW_DIR = 'raw_images_temp'

# --- Main Script ---

def download_images():
    """Downloads base images for each fish species."""
    print("--- Phase 1: Downloading Base Images ---")
    if os.path.exists(RAW_DIR):
        shutil.rmtree(RAW_DIR)
    
    for species in FISH_SPECIES:
        print(f"Downloading images for: {species}...")
        try:
            downloader.download(
                query=f"{species} photo",
                limit=DOWNLOAD_LIMIT,
                output_dir=RAW_DIR,
                adult_filter_off=True,
                force_replace=False,
                timeout=60,
                verbose=False
            )
        except Exception as e:
            print(f"❌ Could not download images for {species}. Error: {e}")
    print("--- ✅ Image Download Complete ---\n")

def augment_images():
    """
    Applies augmentations to the downloaded images to create the synthetic dataset.
    """
    print("--- Phase 2: Generating Synthetic Images ---")
    if os.path.exists(OUTPUT_DIR):
        shutil.rmtree(OUTPUT_DIR)
    
    # Define a powerful augmentation pipeline for variety
    transform = A.Compose([
        A.Resize(width=512, height=512),
        A.HorizontalFlip(p=0.5),
        A.Rotate(limit=30, p=0.8, border_mode=cv2.BORDER_CONSTANT),
        A.RandomBrightnessContrast(brightness_limit=0.3, contrast_limit=0.3, p=0.8),
        A.GaussNoise(var_limit=(10.0, 60.0), p=0.5),
        A.Blur(blur_limit=4, p=0.3),
        A.GridDistortion(p=0.4),
        A.HueSaturationValue(p=0.5)
    ])

    total_images_created = 0
    for species in FISH_SPECIES:
        # The downloader creates a subdirectory with the query name
        species_query_name = f"{species} photo"
        raw_species_dir = os.path.join(RAW_DIR, species_query_name)
        
        # We save it under the clean species name
        output_species_dir = os.path.join(OUTPUT_DIR, species)
        os.makedirs(output_species_dir, exist_ok=True)
        
        if not os.path.exists(raw_species_dir):
            print(f"⚠️ Warning: No raw images found for {species}. Skipping.")
            continue
            
        print(f"Augmenting images for: {species}...")
        image_files = [f for f in os.listdir(raw_species_dir) if f.lower().endswith(('.jpg', '.png', '.jpeg'))]

        for image_file in image_files:
            try:
                image_path = os.path.join(raw_species_dir, image_file)
                image = cv2.imread(image_path)
                if image is None: continue
                
                # Convert color from BGR (OpenCV default) to RGB (Albumentations default)
                image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
                
                for i in range(AUGMENTATIONS_PER_IMAGE):
                    augmented = transform(image=image)['image']
                    
                    # Convert back to BGR for saving
                    augmented_bgr = cv2.cvtColor(augmented, cv2.COLOR_RGB2BGR)
                    
                    base_name, _ = os.path.splitext(image_file)
                    new_filename = f"{base_name}_aug_{i+1}.jpg"
                    save_path = os.path.join(output_species_dir, new_filename)
                    cv2.imwrite(save_path, augmented_bgr)
                    total_images_created += 1
            except Exception as e:
                print(f"❌ Error processing image {image_file}: {e}")

    print("--- ✅ Synthetic Image Generation Complete ---")
    return total_images_created

def cleanup():
    """Removes the temporary raw images directory."""
    print("\n--- Phase 3: Cleaning Up ---")
    if os.path.exists(RAW_DIR):
        shutil.rmtree(RAW_DIR)
    print("✅ Temporary raw image directory removed.")

if __name__ == "__main__":
    print("🚀 Starting Synthetic Fish Dataset Generation 🐟")
    print("=" * 50)
    
    download_images()
    num_generated = augment_images()
    cleanup()
    
    print("\n" + "=" * 50)
    print(f"🎉 Dataset Generation Complete! Total synthetic images created: {num_generated}")