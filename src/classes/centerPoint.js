export default class CenterPoint {
	constructor (x, y) {
		this.x = x;
		this.y = y;
		this.speed = 1;
	}

	move (x, y) {
		this.x = x;
		this.y = y;
	}
}
