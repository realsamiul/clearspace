import os

deobfuscated_path = "/home/realsamkarim/H0QEYE/clearspace/extracted_source/deobfuscated.js"
output_path = "/home/realsamkarim/H0QEYE/clearspace/extracted_source/custom_omega_logic.js"

print("Extracting custom OMEGA animation logic (Module 508)...")

if not os.path.exists(deobfuscated_path):
    print(f"Error: deobfuscated.js not found at {deobfuscated_path}")
    exit(1)

with open(deobfuscated_path, "r", encoding="utf-8") as f:
    lines = f.readlines()

# Module 508 starts on line 9 (index 8) and ends right before Module 105 on line 20136 (index 20135)
start_line = 9
end_line = 20135

module_lines = lines[start_line - 1 : end_line]

with open(output_path, "w", encoding="utf-8") as out:
    out.write("// STANDALONE CUSTOM OMEGA CLEARSPACE SITE LOGIC\n")
    out.write("// Extracted from Module 508 of appv2.js (unpacked & unminified)\n\n")
    out.writelines(module_lines)

print(f"SUCCESS: Standalone custom logic written to {output_path} ({len(module_lines)} lines).")
