const app = Vue.createApp({
	data() {
		return {
			day: 0,
			hour: "00",
			minute: "00",
			second: "00",
			milli: "00",

			interval: 0,
			limit: undefined,
			selected: false,
			title: "",
		}
	},
	methods: {
		setTime() {
			const { interval, limit } = this;
			const now = new Date();
			const gap = limit - now;
			const nokori = new Date(gap);
			const format = (num) => String(num).padStart(2, "0");
			const milli = Math.floor(nokori.getUTCMilliseconds() / 10);
			const ONE_DAY = 24 * 60 * 60 * 1000;
			const day = Math.floor(nokori / ONE_DAY);

			if (gap < 0) return clearInterval(interval);
			
			this.day = day;
			this.hour = format(nokori.getUTCHours());
			this.minute = format(nokori.getUTCMinutes());
			this.second = format(nokori.getUTCSeconds());
			this.milli = format(milli);
		},
		sentaku(event) {
			const { target } = event;
			const { tagName, textContent } = target;
			const { date } = target.dataset;
			const tick = 10;

			if (tagName != "BUTTON") return;

			this.title = textContent;
			this.selected = true;
			this.limit = new Date(date);
			this.interval = setInterval(this.setTime, tick);
		}
	}
})
app.mount("body");
