module.exports = {
	getWrapper,
};

function getWrapper(innerHtml) {
	return `<!DOCTYPE html>
	<html lang="en">
		<head>
			<meta charset="UTF-8">
			<script>
				const logo = document.getElementById('logo');
				const matchDark = window.matchMedia('(prefers-color-scheme: dark)');
			
				const setScreenshot = isDark =>
					(logo.src = (isDark) ? "cid:RucksOnParadeLogo-white" : "cid:RucksOnParadeLogo";
			
				setScreenshot(matchDark.matches);
			</script>
			<style>
				body {
					margin: 0;
					height: 100%;
					background-color: #ededed;
					font-family: 'DejaVu Sans Condensed','Liberation Sans','Nimbus Sans L','Helvetica Neue',Helvetica,Arial,sans-serif;
				}
				a { cursor: pointer; }
				#content {
					background-color: #fefefe;
					margin: auto;
					padding: 48px;
					height: 100%;
					width: 50%;
				}
				header {
					background-color: #eeeeee;
					text-align: center;
					color: white;
					margin-bottom: 48px;
				}
				footer {
					margin-top: 24px;
					padding-top: 24px;
					border-top: solid 1px #d1d1d1;
				}
				#email-message {
					text-align: center;
					font-weight: normal;
				}
				#logo {
					max-width: 422px;
				}
				#tagline {
					margin-top: 48px;
					text-align: center;
					line-height: 1.618em;
					font-weight: normal;
					font-size: 1em;
				}
				#footerAddress {
					line-height: 1.618em;
					font-weight: normal;
					margin-top: 0;
					margin-bottom: 0;
					color: #a1a1a1;
					font-size: 11px;
					margin-left: 0px;
				}
			</style>
		</head>
		<body>
			<div id="content">
				<header>
					<a href="https://www.rucksonparade.com/">
						<img id="logo" src="cid:RucksOnParadeLogo" alt="rucks on parade logo" />
					</a>
				</header>
				<div id="email-message">
					${innerHtml}
				</div>
	
				<h4 id="tagline">Come With It Now</h4>
				<footer>
					<p id="footerAddress">
						Rucks On Parade
						<br>
						PO Box 163
						<br>
						Comstock Park, MI 49321
						<br>
						United States 
					</p>
				</footer>
			</div>
		</body>
	</html>`
}