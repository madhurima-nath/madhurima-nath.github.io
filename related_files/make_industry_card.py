"""Generate Industry & Consulting card image: clean three-panel outcomes visual."""
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches

ACCENT = "#0b6d78"
DARK   = "#1e3a8a"
MID    = "#1a6b5c"
BG     = "white"
PANEL  = "#f4f1ea"

panels = [
    {
        "color":  ACCENT,
        "title":  "GenAI & LLM",
        "metric": "22%",
        "sub":    "faster customer\nresponse time",
    },
    {
        "color":  DARK,
        "title":  "Text Analytics",
        "metric": "~1 yr",
        "sub":    "roadmap\nacceleration",
    },
    {
        "color":  MID,
        "title":  "Analytics &\nData Platforms",
        "metric": "$8M+",
        "sub":    "projected annual\nsavings",
    },
]

fig, axes = plt.subplots(1, 3, figsize=(10, 5.625))  # exactly 16:9
fig.patch.set_facecolor(BG)

for ax, p in zip(axes, panels):
    ax.set_facecolor(BG)
    ax.set_xlim(0, 1)
    ax.set_ylim(0, 1)
    ax.axis("off")

    # Coloured header bar (top 30%)
    header = mpatches.FancyBboxPatch(
        (0, 0.70), 1, 0.30,
        boxstyle="square,pad=0",
        facecolor=p["color"], edgecolor="none",
        transform=ax.transAxes, clip_on=False
    )
    ax.add_patch(header)
    ax.text(0.5, 0.845, p["title"],
            ha="center", va="center",
            fontsize=11, fontweight="bold", color="white",
            fontfamily="monospace", transform=ax.transAxes,
            multialignment="center")

    # Body panel (bottom 70%)
    body = mpatches.FancyBboxPatch(
        (0, 0), 1, 0.70,
        boxstyle="square,pad=0",
        facecolor=PANEL, edgecolor=p["color"], linewidth=1.5,
        transform=ax.transAxes, clip_on=False
    )
    ax.add_patch(body)

    # Large metric
    ax.text(0.5, 0.46, p["metric"],
            ha="center", va="center",
            fontsize=26, fontweight="bold", color=p["color"],
            fontfamily="monospace", transform=ax.transAxes)

    # Thin divider
    ax.plot([0.15, 0.85], [0.22, 0.22],
            color=p["color"], lw=0.8, alpha=0.5,
            transform=ax.transAxes, clip_on=False)

    # Sub-label
    ax.text(0.5, 0.11, p["sub"],
            ha="center", va="center",
            fontsize=8.5, color="#555",
            fontfamily="monospace", transform=ax.transAxes,
            multialignment="center")

plt.tight_layout(pad=0.3)
out = "/Users/madhurimanath/Documents/projects/madhurima-nath.github.io/related_files/industry_card.png"
plt.savefig(out, dpi=160, bbox_inches="tight", facecolor=BG)
print(f"Saved: {out}")
