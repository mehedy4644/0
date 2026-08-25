
#!/data/data/com.termux/files/usr/bin/bash

GREEN="\033[1;32m"
YELLOW="\033[1;33m"
RESET="\033[0m"

echo -e "${GREEN}[+] Setting up local 0 environment...${RESET}"

echo -e "${GREEN}[+] Installing Python dependencies...${RESET}"


chmod +x 0.py

echo -e "${GREEN}[+] Setting up '0' command...${RESET}"

BIN_DIR="$PREFIX/bin"
ZERO_BIN="$BIN_DIR/0"
SCRIPT_DIR="$(pwd)"

cat > "$ZERO_BIN" <<EOF
#!/data/data/com.termux/files/usr/bin/bash
cd "$SCRIPT_DIR" || exit

# Update Logic
if [ "\$1" == "update" ]; then
    echo -e "\033[1;32m[+] Fetching latest updates from MSR's GitHub...\033[0m"
    git reset --hard HEAD > /dev/null 2>&1
    git pull origin main

    chmod +x 0.py

    echo -e "\033[1;32m[+] Re-applying 0 command setup...\033[0m"
    bash 1.sh > /dev/null 2>&1

    echo -e "\033[1;32m[✓] 0 updated successfully!\033[0m"
    exit 0
fi

# Help Logic
if [ "\$1" == "help" ]; then
    python help.py
    exit 0
fi

# Fix Logic
if [ "\$1" == "fix" ]; then
    bash fix.sh
    exit 0
fi

# Contact Logic
if [ "\$1" == "contact" ]; then
    python contact.py
    exit 0
fi

# Menu Logic
if [ "\$1" == "menu" ]; then
    sudo python 0.py
    exit 0
fi

# Old Logic
if [ "\$1" == "old" ]; then
    sudo python w1.py -i wlan0 -K
    exit 0
fi

# Run Logic
if [ -z "\$1" ]; then
    sudo python 0.py -i wlan0 -K
else
    sudo python 0.py "\$@"
fi
EOF

chmod +x "$ZERO_BIN"

echo -e "\n${GREEN}[✓] Local setup complete!${RESET}"


echo -e "\n\033[1;31m  [!] IMPORTANT — If '0' shows:\033[0m"
echo -e "\n\033[1;36m══════════════════════════════════════════════\033[0m"
echo -e "\033[1;32m  [✓] All done! Type '0' to get started.\033[0m"
echo -e "\033[1;36m══════════════════════════════════════════════\033[0m\n"
