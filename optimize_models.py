import subprocess
import os

models = [
    ('Meshy_AI_Golden_Victory_Coin_0903065154_texture.glb', 'coin.glb'),
    ('Meshy_AI_Neon_Quantum_Visor_0903064703_texture.glb', 'visor.glb'),
    ('Meshy_AI_Violet_Victory_Trophy_0903065616_texture.glb', 'trophy.glb'),
    ('Meshy_AI_Neon_Aether_Controlle_0903070252_texture.glb', 'controller.glb'),
    ('bgmi_pubg_airdrop.glb', 'airdrop.glb'),
    ('pubg_level_3_helmet.glb', 'helmet.glb')
]

os.makedirs('optimized_models', exist_ok=True)

for src, dst in models:
    src_path = os.path.join('3dmodels', src)
    dst_path = os.path.join('optimized_models', dst)
    print(f'Optimizing {src} -> {dst}...')
    cmd = f'npx --yes @gltf-transform/cli resize --width 1024 --height 1024 "{src_path}" "{dst_path}"'
    res = subprocess.run(cmd, shell=True, capture_output=True, text=True)
    if res.returncode != 0:
        print(f'Failed {src}: {res.stderr}')
    else:
        size = round(os.path.getsize(dst_path) / (1024 * 1024), 2)
        print(f'Done {dst}: {size} MB')

print('\nSummary of optimized_models:')
for f in os.listdir('optimized_models'):
    print(f, round(os.path.getsize(os.path.join('optimized_models', f)) / (1024 * 1024), 2), 'MB')
