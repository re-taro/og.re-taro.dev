import type { CSSProperties, FC } from "react";
import type { CardTemplate } from "./constant";

export interface CardProps {
	textNode: string[];
	titleNode: string[];
	tmp: CardTemplate;
}

const PlainCard: FC<Pick<CardProps, "textNode" | "titleNode">> = ({
	textNode,
	titleNode,
}) => {
	const s = styles({ tmp: "plain" });

	return (
		<article style={s.container}>
			<div style={s.inner}>
				<h1 style={s.heading}>
					{titleNode.map(word => (
						<span key={word} style={s.span}>
							{word}
						</span>
					))}
				</h1>
				<p style={s.paragraph}>
					{textNode.map(word => (
						<span key={word} style={s.span}>
							{word}
						</span>
					))}
				</p>
			</div>
		</article>
	);
};

const ColorCard: FC<Pick<CardProps, "textNode" | "titleNode">> = ({
	textNode,
	titleNode,
}) => {
	const s = styles({ tmp: "color" });

	return (
		<article style={s.container}>
			<div style={s.gradation} />
			<div style={s.inner}>
				<h1 style={s.heading}>
					{titleNode.map(word => (
						<span key={word} style={s.span}>
							{word}
						</span>
					))}
				</h1>
				<p style={s.paragraph}>
					{textNode.map(word => (
						<span key={word} style={s.span}>
							{word}
						</span>
					))}
				</p>
			</div>
		</article>
	);
};

export const Card: FC<CardProps> = ({ textNode, titleNode, tmp }) => {
	const props = { textNode, titleNode };

	return tmp === "plain" ? <PlainCard {...props} /> : <ColorCard {...props} />;
};

function styles({
	tmp,
}: Pick<CardProps, "tmp">): Record<
	"container" | "gradation" | "heading" | "inner" | "paragraph" | "span",
		CSSProperties
	> {
	return {
		container: {
			backgroundColor: "#0b1215",
			display: "flex",
			flexDirection: "column",
			height: "100vh",
			justifyContent: "center",
			padding: tmp === "plain" ? "8rem" : 0,
			width: "100vw",
		},
		gradation: {
			backgroundImage:
				"linear-gradient(45deg, #0c1418, #ff7f00, #00a0b0, #0c1820)",
			filter: "blur(196.875px) saturate(125%)",
			height: "630px",
			opacity: 0.92,
			position: "absolute",
			width: "1200px",
		},
		heading: {
			color: "#ebeeef",
			flexWrap: "wrap",
			fontFamily: "NotoSansJP",
			fontSize: "3.75rem",
			fontWeight: 700,
			lineHeight: 1.25,
		},
		inner: {
			display: "flex",
			flexDirection: "column",
			padding: tmp === "color" ? "8rem" : 0,
		},
		paragraph: {
			color: tmp === "plain" ? "#6d7173" : "#ebeeef",
			flexWrap: "wrap",
			fontFamily: "JetBrainsMono",
			fontSize: "1.875rem",
			fontWeight: 500,
			lineHeight: "2.25rem",
		},
		span: {
			display: "block",
		},
	};
}
