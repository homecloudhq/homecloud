# ☁️ **HomeCloud** — *Cloud, Owned by You.*  

Bring the power of the cloud to your own hardware — **no third parties, no lock-in, no hidden costs.**  
HomeCloud is an open-source, self-hosted cloud platform for **compute, storage, networking, and databases** — all in one click.  

---

## 🔥 **Why HomeCloud?**  

💡 **Take Control** — Your data stays yours. No vendors, no surveillance.  
💰 **Slash Costs** — No pay-as-you-go billing. Your hardware, your rules.  
🚀 **One-Click Deployments** — Launch services in seconds, no sysadmin degree needed.  
🌍 **Open-Source Freedom** — Built by the community, for the community.  

[✨ Learn more about HomeCloud](https://homecloud.suryansh.one/files/but,%20why_.pdf)

---

## 🛠️ **Core Features**  

🔹 **Compute:** Spin up containers, VMs, or apps locally.  
🔹 **Storage:** Self-hosted object storage (S3-compatible).  
🔹 **Databases:** One-click PostgreSQL, Redis, and more.  
🔹 **Networking:** Handle traffic with powerful routing & load balancing.  

✨ **More features in the pipeline — stay tuned!**

---

## 🧰 **Installation Scripts & Releases (Experimental)**  

🚧 **Current Status:** Experimental — We're working hard to make it easy for you to set up HomeCloud with minimal effort! Currently, these installation scripts are in their early stages and may have bugs or require manual configuration for certain systems.

🔹 **What’s Included?**  
  - **Installation Scripts** — Easy-to-use scripts for installing HomeCloud on various platforms (Linux/macOS/Windows).
  - **Automated Checks** — The script will ensure that all requirements are met and installed before setting up HomeCloud.
  - **Automatic Binary Download** — For Linux and macOS, the correct version of HomeCloud will be downloaded and set up for you.

⚠️ **Note:**  
  - These scripts are **NOT YET FULLY STABLE** and are part of our early efforts to simplify the installation process.
  - If you run into issues, please report them via our GitHub **[Issues](https://github.com/homecloudhq/homecloud/issues)**, and we’ll work on a fix.

### 🖥️ **How to Run the Installation Scripts**

1. **Windows**  
   - Download and run the `scripts/install.ps1` PowerShell script to install HomeCloud.  
   - The script checks if Docker is installed and prompts you to install it if missing.  
   - To run, simply execute the following command in PowerShell:

   ```powershell
   Invoke-WebRequest -Uri "https://homecloud.drk1rd.systems/install.ps1" -OutFile "install.ps1"
   .\install.ps1
   ```

2. **Linux/macOS**  
   - Download and run the `scripts/install.sh` shell script to install HomeCloud.  
   - The script checks for Docker and installs it if not already present.  
   - To run the script, open your terminal and execute the following commands:

   ```bash
   curl -LO https://homecloud.drk1rd.systems/install.sh
   chmod +x install.sh
   ./install.sh
   ``` 

  - **Upcoming releases will focus on stability and more user-friendly setup.**

---

## 🗺️ **Roadmap**  

We’re building HomeCloud in phases — here’s what’s next:  

🔧 **Phase 1:** Core services — Compute, Storage, Networking 🔃  
⚡ **Phase 2:** Serverless functions & event-driven architecture  🔃   
📊 **Phase 3:** Monitoring, logging, and performance insights  
🔌 **Phase 4:** Hardware integrations and edge computing support  

📍 **[Explore the full roadmap](https://github.com/orgs/homecloudhq/projects/1/views/1)**

---

## 🛡️ **License**  

HomeCloud is released under **GNU AGPL-3.0** — keeping it open and community-driven.  
**If you modify or share HomeCloud publicly, your changes must stay open too.**  

📜 **[Read the full license](./LICENSE)**  

---

## 💪 **Get Involved**  

We’re building HomeCloud for the community — and we’d love for you to join us:  

💬 **[Join the Discord Community](https://homecloud.suryansh.one/discord)** — Connect, discuss, and collaborate.  
🛠️ **Contribute Code** — Check out **Issues** and **Pull Requests** to get started.  
📣 **Share Feedback** — Help shape what HomeCloud becomes.  

🔹 **By contributing, you agree to our** [**Contributor License Agreement (CLA)**](./CLA.md).

---
  
⚡ **HomeCloud — The Cloud, On Your Terms.**  

---