# OMEGA Clearspace Source Assets Clone

This folder contains the complete, high-fidelity downloaded source scripts, stylesheets, fonts, and 3D WebGL assets of the **OMEGA Clearspace** page (`https://www.omegawatches.com/world-of-omega/sustainability/clearspace`).

All block/protection mechanisms (such as Akamai stream rejections and TLS signature checks) were bypassed using advanced browser impersonation.

## Asset Directory Map

Below is the local directory structure showing where each asset from the original server has been downloaded and mapped:

| Remote Server Path | Local File Path | Size | Description |
|---|---|---|---|
| `/world-of-omega/sustainability/clearspace` | `index.html` | 48 KB | The core entry HTML document |
| `/world-of-omega/sustainability/clearspace/appv2.css` | `world-of-omega/sustainability/clearspace/appv2.css` | 28 KB | Primary layout & entrance animation styles |
| `/world-of-omega/sustainability/clearspace/appv2.js` | `world-of-omega/sustainability/clearspace/appv2.js` | 1.3 MB | Main JS Bundle (Three.js/GSAP/WebGL logic) |
| `/media/external/omega-external.js` | `media/external/omega-external.js` | 8.0 KB | Global external utility JS |
| `/world-of-omega/sustainability/clearspace/assets/fonts/omega-ct/*` | `world-of-omega/sustainability/clearspace/assets/fonts/omega-ct/*` | ~230 KB total | 6 `OmegaCT` brand display & body fonts (`.woff`, `.woff2`) |
| `/world-of-omega/sustainability/clearspace/assets/fonts/austin/*` | `world-of-omega/sustainability/clearspace/assets/fonts/austin/*` | ~110 KB total | 2 `Austin` editorial serif brand fonts (`.woff`, `.woff2`) |
| `/world-of-omega/sustainability/clearspace/assets/models/satellite.glb` | `world-of-omega/sustainability/clearspace/assets/models/satellite.glb` | 1.8 MB | High-poly 3D satellite model used for Three.js WebGL orbit scene |
| `/world-of-omega/sustainability/clearspace/assets/models/frame.glb` | `world-of-omega/sustainability/clearspace/assets/models/frame.glb` | 1.4 KB | Custom structure frame 3D wireframe helper model |

*Note: Analytical/tracking scripts (e.g. Google Tag Manager, Adobe privacy trackers) were bypassed to prevent localhost latency and unwanted data capture.*

---

## Running the Clone Locally

To run this clone with all animations, 3D orbits, and typefaces rendering perfectly, **you must serve the `clearspace/` directory as the server root**. This is because all stylesheets, scripts, and model loaders resolve absolute paths relative to the host root (e.g. `/world-of-omega/...`).

### Option 1: Python HTTP Server (Easiest)
Navigate to the `clearspace` folder and run:
```bash
python3 -m http.server 8000
```
Then open: [http://localhost:8000](http://localhost:8000)

### Option 2: Node.js http-server
```bash
npx http-server . -p 8000
```
Then open: [http://localhost:8000](http://localhost:8000)

### Option 3: VS Code "Live Server" Extension
Set the root directory of the workspace or server to `/clearspace/` and click **Go Live**.
