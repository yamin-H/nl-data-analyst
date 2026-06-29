import matplotlib
matplotlib.use("Agg")  
import matplotlib.pyplot as plt
import pandas as pd
import io
import base64

def generate_chart(results: list, question: str) -> str | None:
    if not results or len(results) < 2:
        return None

    df = pd.DataFrame(results)
    if len(df.columns) < 2:
        return None

    fig, ax = plt.subplots(figsize=(10, 5))
    x_col = df.columns[0]
    y_col = df.columns[1]

    if not pd.api.types.is_numeric_dtype(df[y_col]):
        plt.close()
        return None

    ax.bar(
        df[x_col].astype(str),
        df[y_col],
        color="steelblue",
        edgecolor="white"
    )

    ax.set_title(question, fontsize=13, pad=15)
    ax.set_xlabel(x_col, fontsize=11)
    ax.set_ylabel(y_col, fontsize=11)
    plt.xticks(rotation=45, ha="right")
    plt.tight_layout()

    buffer = io.BytesIO()
    plt.savefig(buffer, format="png", dpi=150)
    plt.close()
    buffer.seek(0)
    image_base64 = base64.b64encode(buffer.read()).decode("utf-8")

    return image_base64