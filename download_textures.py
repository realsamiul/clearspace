import os
import shutil
from urllib.parse import urljoin
from curl_cffi import requests

# Base config
url = "https://www.omegawatches.com/world-of-omega/sustainability/clearspace"
base_dir = "/home/realsamkarim/H0QEYE/clearspace"
nested_assets_dir = os.path.join(base_dir, "world-of-omega/sustainability/clearspace/assets")
root_assets_dir = os.path.join(base_dir, "assets")

textures = [
    "assets/textures/earth/albedo.jpg",
    "assets/textures/earth/data.jpg",
    "assets/textures/landscape/mountains.jpg",
    "assets/textures/landscape/border.jpeg",
    "assets/textures/landscape/mountains.png",
    "assets/textures/landscape/stars.jpg",
    "assets/textures/stars-bg.jpg",
    "assets/textures/rays2.jpg",
    "assets/textures/perlin.jpg",
    "assets/textures/solid.jpg",
    "assets/textures/smoke.jpg",
    "assets/textures/glow.jpg",
    "assets/textures/envmap0001.hdr"
]

print("Starting OMEGA Clearspace WebGL Texture Download Sequence...")

for tex_rel_path in textures:
    full_url = urljoin(url + "/", tex_rel_path)
    
    # Mirror structure path
    save_path_nested = os.path.join(nested_assets_dir, tex_rel_path.replace("assets/", ""))
    os.makedirs(os.path.dirname(save_path_nested), exist_ok=True)
    
    print(f"Downloading WebGL Texture: {full_url}")
    try:
        r = requests.get(full_url, impersonate="chrome120", timeout=20)
        if r.status_code == 200:
            with open(save_path_nested, "wb") as f:
                f.write(r.content)
            print(f"SUCCESS: Saved to {save_path_nested} ({len(r.content)} bytes)")
            
            # Copy to root assets folder for Vercel loading compatibility
            save_path_root = os.path.join(root_assets_dir, tex_rel_path.replace("assets/", ""))
            os.makedirs(os.path.dirname(save_path_root), exist_ok=True)
            shutil.copy2(save_path_nested, save_path_root)
            print(f"COPIED to root assets folder: {save_path_root}")
        else:
            print(f"WARNING: HTTP Status {r.status_code} for {full_url}")
    except Exception as e:
        print(f"ERROR: Failed downloading {full_url}. Reason: {e}")

print("\nWebGL Texture Download sequence completed for Clearspace!")
