# 🧬 GenLayer Rank Check

A high-performance, real-time rank tracking dashboard for the GenLayer Discord community. This tool connects directly to MEE6 data to provide users with a visual breakdown of their level, XP progression, and evolutionary role within the network.

![GenLayer Header](https://files.oaiusercontent.com/file-afS1w3m1mUisKqGvTzK3Wv?se=2025-12-27T16%3A22%3A01Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D0f3938be-238d-4be7-8314-998845014f34.webp&sig=G/V7K99q13qf0V2XUbe/w%2BrvQ%2BOf7eJvG6%2BUz0/u7uA%3D)

## 🚀 Features

* **Deep Member Scanning:** Automatically crawls the top **2,000 members** of the GenLayer leaderboard.
* **Role-Based Color Logic:** The interface and user identity dynamically change color based on their level.
* **Live Auto-Refresh:** Background "heartbeat" system updates XP and levels every **120 seconds** without page reloads.
* **Optimized for Stability:** Built with a "2G/3G First" mentality, ensuring the app remains functional even on slow mobile networks.
* **Visual Progression:** Sleek XP bars and high-fidelity role icons.

## 📊 Evolutionary Roles

| Role | Level Range | Color |
| :--- | :--- | :--- |
| **Molecule** | 1 - 6 | 🟡 Yellow |
| **Neuron** | 7 - 17 | 🟠 Orange |
| **Synapse** | 18 - 35 | 🔵 Blue |
| **Brain** | 36 - 53 | 🟣 Purple |
| **Singularity 🎖️🎊** | 54+ | 🟢 Green |

## 🛠️ Tech Stack

* **Framework:** Next.js 14
* **Styling:** CSS-in-JS (Optimized for fast rendering)
* **Deployment:** Vercel
* **Data Source:** MEE6 Public API (Guild: 1237055789441487021)

## 📦 Installation & Local Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/genlayer-rank-check.git](https://github.com/your-username/genlayer-rank-check.git)
