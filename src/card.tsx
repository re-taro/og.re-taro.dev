import type { CSSProperties, FC } from "react";
import type { CardTemplate } from "./constant";

export interface CardProps {
	titleNode: string[];
	textNode: string[];
	tmp: CardTemplate;
}

const PlainCard: FC<Pick<CardProps, "titleNode" | "textNode">> = ({
	titleNode,
	textNode,
}) => {
	const s = styles({ tmp: "plain" });

	return (
		<article style={s.container}>
			<div style={s.inner}>
				<h1 style={s.heading}>
					{titleNode.map((word, i) => (
						<span key={i} style={s.span}>
							{word}
						</span>
					))}
				</h1>
				<p style={s.paragraph}>
					{textNode.map((word, i) => (
						<span key={i} style={s.span}>
							{word}
						</span>
					))}
				</p>
			</div>
		</article>
	);
};

const ColorCard: FC<Pick<CardProps, "titleNode" | "textNode">> = ({
	titleNode,
	textNode,
}) => {
	const s = styles({ tmp: "color" });

	return (
		<article style={s.container}>
			<div style={s.gradation} />
			<div style={s.inner}>
				<h1 style={s.heading}>
					{titleNode.map((word, i) => (
						<span key={i} style={s.span}>
							{word}
						</span>
					))}
				</h1>
				<p style={s.paragraph}>
					{textNode.map((word, i) => (
						<span key={i} style={s.span}>
							{word}
						</span>
					))}
				</p>
			</div>
		</article>
	);
};

export const Card: FC<CardProps> = ({ titleNode, textNode, tmp }) => {
	const props = { titleNode, textNode };

	return tmp === "plain" ? <PlainCard {...props} /> : <ColorCard {...props} />;
};

function styles({
	tmp,
}: Pick<CardProps, "tmp">): Record<
	"container" | "gradation" | "inner" | "heading" | "paragraph" | "span",
	CSSProperties
> {
	return {
		container: {
			width: "100vw",
			height: "100vh",
			padding: tmp === "plain" ? "8rem" : 0,
			display: "flex",
			flexDirection: "column",
			justifyContent: "center",
			backgroundColor: "#0b1215",
		},
		gradation: {
			position: "absolute",
			width: "1200px",
			height: "630px",
			filter: "blur(196.875px) saturate(125%)",
			backgroundImage:
			"linear-gradient(45deg, #0c1418, #ff7f00, #00a0b0, #0c1820)",
			opacity: 0.92,
		},
		inner: {
			padding: tmp === "color" ? "8rem" : 0,
			display: "flex",
			flexDirection: "column",
		},
		heading: {
			fontSize: "3.75rem",
			lineHeight: 1.25,
			color: "#ebeeef",
			fontWeight: 700,
			fontFamily: "NotoSansJP",
			flexWrap: "wrap",
		},
		paragraph: {
			fontSize: "1.875rem",
			lineHeight: "2.25rem",
			color: tmp === "plain" ? "#6d7173" : "#ebeeef",
			fontWeight: 500,
			fontFamily: "JetBrainsMono",
			flexWrap: "wrap",
		},
		span: {
			display: "block",
		},
	};
}
