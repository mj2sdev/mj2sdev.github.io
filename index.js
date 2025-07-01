const app = Vue.createApp({
	data() {
		return {
			day: 0,
			hour: '00',
			minute: '00',
			second: '00',
			milli: '00',

			interval: 0,
			limit: undefined,
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
	},
	mounted() {
		const tick = 10;
		this.limit = new Date("2025-07-06 10:00:00");
		this.interval = setInterval(this.setTime, tick);
	}
})
app.mount("body");
