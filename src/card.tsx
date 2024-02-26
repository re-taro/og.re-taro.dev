import type { FC } from "react";

export interface CardProps {
	title: string;
	date: string;
	domain: string;
}

const src =
	"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAGQAZADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD2uiiiuc8cKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKw/FXjbQvBNmLrW9Ut9PiP3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AooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACvnT9of4kX+ra7J8P9Cv4tNjSze91rUmYgwQKufLGP4mGBgckug716Z8b/iJN8NPAN1qdnbtd6nM62tnCilsyvnBIHUDBOO+AO9fCjx6nZ32pPqskjareSbr3zf8AWBt2SjH64JHqB6V6OEo8753sejhKPPLmexB4pCatNbrY2y2mnWoKQWfmE4X1Ld2J5LY5J7DgQyfa7yQMxSwi+zpbNDakjzEXpuOec4yfWrNFe06UG02j3ORbjY4khQIi7VHQCnUU2SRYlLMcCtNkWFvqN/4c1W01zSbhrTUrJxJHIncDqD6j27g19/fCT4hQfE/wLp+uxKsc0gMdzCpz5cy8Mv8AUexFfACOk6HHI6HNe8/sS+JHstc8S+GZJMQyIt7DGx/iB2vj6gr/AN815mMpqUOdHl42mpQ510PriiiivDPDCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAoorz/40eLLzQPCq6bo+H8Sa7Kum6ZFu2nzJODIT2CKSxY8DAzVRi5NJFRi5NJHmXiT4yrpureJfHUDrJLp4k8PeE1kGVW4IxeX4B4JRCEQ9MuP7pr5ah1BtSaaZt7EyENI5yXbqTnv1/Wup+KWsafPqFvpOjP5mhaJbrpljKuQLgISZLgg95ZC8nsHA7VljRG0/wAD+HdQJUJqDXThc85SXaSR6cDH0NfR0YqnaKPpqUVTSgjOooorrOgKzNdz5UPOEMgBrTrP15f+Jezf3WB/WplsTLYuxwrCuB68n1roPhX4p/4QL4ueHdZckWkkwtbjHZH+Qn8M5/CsCJ/MjRh0IB/SqWtRs9izKdrIQ+fTFROClDlIqRUoOJ+ngpa5v4b623iT4f8Ah3U5GDy3VhDLIw6Fig3frmukr5VqzsfKtWdgooopCCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACvkT4yeOptT8Sa1rqMRbRrLoGisDwe17cL9QfKB77z6V9Xy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v4N65qkhj8toRxueZCij88Z/CodSPVnO7yep5+rbTjzM/hTpGKry2PoK9rsv2cYYo1e51VpZe8cce1fpu5/lV9Pg6bVQLbT9Pdg2N95M7nHrgLisvbQ6MOVngcFpcXkgSCCSZ24AVSxNeleCPgbqWsTRz6wrafZ9Sjf6xvbHavbvDfhKDw/HnMcs2MFkhCAfQdf1rerCeIe0S1Eo6RotnoWnw2VlbrDbxDCqB+p96vUUVx3uWFFFFIAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKwvF/g6w8aaZ9jvgw2tujljOGRumRW7RTTad0B4Jq37P2qwTOdPvbe6h6qJco/0PBFR6R8AdZupG/tC6t7GMdNn7wt+WMV7/AEVv7eZPKjhvD3wd8O6EFaS3OozqciS65H4L0rtYbeK3hWKKNY4l4CKoAH4VJRWLk5blGTd+E9Fvi5uNJs5S53MWgXJPrnFGm+FdG0eQS2WmWttIOjxxAN+da1FLmYCUtFFIAooooAKKKKACiiigAqC8sbfULdoLqCO4hbho5FDKfwNT0UAZNv4V0i0XbFp8KD0xmtGG1htlxFEkQ/2VAqWincA6UUUUgCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA/9k=";

export const Card: FC<CardProps> = ({ title, date, domain }) => (
	<div
		style={{
			height: "100%",
			width: "100%",
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			justifyContent: "center",
			padding: "30px",
			fontFamily: "NotoSansJP",
			backgroundColor: "#2E3440",
			color: "#E5E9F0",
		}}
	>
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				padding: "48px",
				width: "100%",
				height: "100%",
				borderStyle: "solid",
				borderColor: "#FFFFFF",
				borderWidth: "4px",
				borderRadius: "12px",
			}}
		>
			<div
				style={{
					display: "flex",
					flex: "1 1 0%",
					maxWidth: "100%",
					alignItems: "center",
					maxHeight: "100%",
				}}
			>
				<h1
					style={{
						fontSize: "60px",
						lineHeight: 1,
						maxWidth: "100%",
					}}
				>
					<p
						style={{
							width: "100%",
							justifyContent: "center",
						}}
					>
						{title}
					</p>
				</h1>
			</div>
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
					width: "100%",
				}}
			>
				<div
					style={{
						display: "flex",
						alignItems: "center",
					}}
				>
					<img
						src={src}
						alt="icon"
						width={100}
						height={100}
						style={{ borderRadius: "9999px", marginRight: "20px" }}
					/>
					<h2
						style={{
							fontSize: "36px",
							lineHeight: "40px",
							marginRight: "20px",
						}}
					>
						<p
							style={{
								fontFamily: "JetBrainsMono",
							}}
						>
							{domain}
						</p>
					</h2>
				</div>
				<div
					style={{
						display: "flex",
					}}
				>
					<h2
						style={{
							fontSize: "36px",
							lineHeight: "40px",
						}}
					>
						<p>{date}</p>
					</h2>
				</div>
			</div>
		</div>
	</div>
);
