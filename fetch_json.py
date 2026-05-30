import urllib.request
import os
import json

dua_ids = ["dua-kumayl", "dua-ahad", "dua-nudba", "hadith-e-kisa", "hadith-kisa", "hadithkisa", "tawassul", "dua-tawassul"]

# Put fetched JSON in a folder in workspace to avoid .gemini path
output_dir = "./fetch_json_temp"
os.makedirs(output_dir, exist_ok=True)

headers = {'User-Agent': 'Mozilla/5.0'}

for dua_id in dua_ids:
    url = f"https://www.duas.org/data_v2/{dua_id}.json"
    try:
        print(f"Fetching JSON for {dua_id} from {url}...")
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as response:
            data = response.read()
            # Try to parse it to confirm it's valid JSON
            json_data = json.loads(data.decode('utf-8'))
            filepath = os.path.join(output_dir, f"{dua_id}.json")
            with open(filepath, "w", encoding="utf-8") as f:
                json.dump(json_data, f, ensure_ascii=False, indent=2)
            print(f"  Saved JSON to {filepath}, size={len(data)} bytes")
    except Exception as e:
        print(f"  Failed {dua_id}: {e}")
