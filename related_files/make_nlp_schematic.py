"""Generate NLP pipeline schematic: text classification + sentiment analysis."""
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches

ACCENT   = "#0b6d78"
DARK     = "#1e3a8a"
BOX_FACE = "#f4f1ea"
BOX_EDGE = "#0b6d78"
ARROW    = "#0b6d78"
BG       = "white"

fig, axes = plt.subplots(1, 2, figsize=(13, 4.5))
fig.patch.set_facecolor(BG)


def draw_flow(ax, title, steps, output_label, output_color):
    ax.set_facecolor(BG)
    ax.set_xlim(0, 1)
    ax.set_ylim(0, 1)
    ax.axis("off")

    ax.text(0.5, 0.97, title, ha="center", va="top",
            fontsize=11, fontweight="bold", color=DARK,
            fontfamily="monospace")

    n_slots = len(steps) + 1          # steps + 1 output box
    box_h   = 0.11
    gap     = 0.055
    total_h = n_slots * box_h + (n_slots - 1) * gap
    margin  = (0.88 - total_h) / 2    # centre vertically in top 88% of axis
    top_y   = 0.88 - margin           # y of top edge of first box

    def box_top(i):
        return top_y - i * (box_h + gap)

    def box_bot(i):
        return box_top(i) - box_h

    # Draw step boxes
    for i, (label, sub) in enumerate(steps):
        y_top = box_top(i)
        rect = mpatches.FancyBboxPatch(
            (0.06, y_top - box_h), 0.88, box_h,
            boxstyle="round,pad=0.01",
            facecolor=BOX_FACE, edgecolor=BOX_EDGE, linewidth=1.4,
            transform=ax.transAxes, clip_on=False
        )
        ax.add_patch(rect)
        mid_y = y_top - box_h / 2
        ax.text(0.5, mid_y + 0.022, label,
                ha="center", va="center",
                fontsize=9.5, fontweight="bold", color=DARK,
                fontfamily="monospace", transform=ax.transAxes)
        ax.text(0.5, mid_y - 0.018, sub,
                ha="center", va="center",
                fontsize=7.8, color="#555", style="italic",
                fontfamily="monospace", transform=ax.transAxes)

        # Arrow to next slot
        arrow_y_start = y_top - box_h
        arrow_y_end   = arrow_y_start - gap
        ax.annotate("", xy=(0.5, arrow_y_end + 0.004),
                    xytext=(0.5, arrow_y_start - 0.004),
                    xycoords="axes fraction", textcoords="axes fraction",
                    arrowprops=dict(arrowstyle="-|>", color=ARROW,
                                   lw=1.4, mutation_scale=13))

    # Output box (slot index = len(steps))
    i_out  = len(steps)
    y_top  = box_top(i_out)
    rect_o = mpatches.FancyBboxPatch(
        (0.13, y_top - box_h), 0.74, box_h,
        boxstyle="round,pad=0.01",
        facecolor=output_color, edgecolor=output_color, linewidth=1.6,
        transform=ax.transAxes, clip_on=False
    )
    ax.add_patch(rect_o)
    ax.text(0.5, y_top - box_h / 2, output_label,
            ha="center", va="center",
            fontsize=9.5, fontweight="bold", color="white",
            fontfamily="monospace", transform=ax.transAxes)


# Left: Text Classification
draw_flow(
    axes[0],
    "Text Classification",
    [
        ("Raw Text",    "product descriptions · legal documents"),
        ("Preprocess",  "lowercase · stop words · lemmatise"),
        ("Vectorise",   "TF-IDF · Word2Vec embeddings"),
        ("Classifier",  "RandomForest · SVM"),
    ],
    "Category Label",
    ACCENT,
)

# Right: Sentiment & Topic Modelling
draw_flow(
    axes[1],
    "Sentiment & Topic Modelling",
    [
        ("Raw Text",        "incident reports · free-text feedback"),
        ("Preprocess",      "tokenise · normalise · filter"),
        ("Sentiment Score", "positive · neutral · negative"),
        ("Topic Model",     "LDA · NMF · SparkNLP"),
    ],
    "Themes & Insights",
    DARK,
)

plt.tight_layout(pad=1.2)
out = "/Users/madhurimanath/Documents/projects/madhurima-nath.github.io/related_files/nlp_schematic.png"
plt.savefig(out, dpi=160, bbox_inches="tight", facecolor=BG)
print(f"Saved: {out}")
