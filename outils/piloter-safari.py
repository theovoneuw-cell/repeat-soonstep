import sys, subprocess
js = open(sys.argv[1], encoding="utf-8").read()
esc = js.replace("\\", "\\\\").replace('"', '\\"').replace("\n", "\\n")
# on vise le document de l'appli, pas celui du simulateur
script = '''tell application "Safari"
  set cible to missing value
  repeat with d in documents
    set u to (URL of d) as string
    if u does not contain "/outils/" and (u contains "index.html" or u ends with "/") then set cible to d
  end repeat
  if cible is missing value then return "aucun onglet ouvert sur l'application"
  do JavaScript "%s" in cible
end tell''' % esc
r = subprocess.run(["osascript","-e",script], capture_output=True, text=True)
sys.stdout.write(r.stdout)
if r.returncode: sys.stderr.write(r.stderr)
