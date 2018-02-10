inventory = [];

AFRAME.registerComponent('holdable', {
  schema: {
  	isHoldable: {type: 'boolean', default: true},
  	id: {type: 'string', default: "Unknown Object"}
  },
  init: function () {
  	var element = this.el;
  	var ground = this.el.sceneEl.querySelector("#ground");
  	var data = this.data;
  	var isHolding = false;
  	element.addEventListener("click", function () {
  		if (!isHolding) {
			element.setAttribute('visible', false);
			inventory.push(data.id);
			isHolding = true;
			console.log("You picked up: " + data.id);
		}
  	});
  	ground.addEventListener('click', (event) => {
		if (isHolding && (data.id == inventory[0])) {
			findLocation = function(event) {
				var newLocation = event.detail.intersection.point;
				newLocation = newLocation.x + ", 1, " + newLocation.z;
				console.log(newLocation);
				element.setAttribute('position', newLocation);
			}
			ground.addEventListener('raycaster-intersected', findLocation(event));
			ground.removeEventListener('raycaster-intersected', findLocation(event));
			element.setAttribute('visible', true);
			inventory.shift();
			isHolding = false;
			
			console.log("You put down: " + data.id.toString());
		}
	});
  	document.addEventListener('keypress', (event) => {
  		const keyName = event.key;
  		if (keyName == 'i') {
  			console.log(inventory);
  		} 
	});
  }
});