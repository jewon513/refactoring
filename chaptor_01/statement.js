import invoices from "./json/invoices.json"
import plays from "./json/plays.json"
import createStatementData from "./createStatementData.js"

function statement(invoice, plays) {
	renderPainText(createStatementData(invoice,plays))
	renderHtml(createStatementData(invoice,plays))
}

function usd(aNumber) {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		minimumFractionDigits: 2
	}).format(aNumber / 100);
}

function renderPainText(data){
	let result = `청구 내역 (고객명: ${data.customer})\n`;
	for (let perf of data.performances) {
		result += `${perf.play.name} : ${usd(perf.amount)} (${perf.audience}석)\n`;
	}
	result += `총액: ${usd(data.totalAmount)}\n`;
	result += `적립 포인트: ${data.totalVolumeCredits}점\n`;

	console.log(result)
}

function renderHtml(data){
	console.log(data)
	return data
}


invoices.map(invoice=>{
	statement(invoice, plays)
})