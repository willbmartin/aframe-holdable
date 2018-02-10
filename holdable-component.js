inventory = []; //global inventory data structure

AFRAME.registerComponent('holdable', {
  schema: {
  	isHoldable: {type: 'boolean', default: true},
  	id: {type: 'string', default: "Unknown Object"}
  },
  init: function () {
  	var element = this.el;
  	var ground = this.el.sceneEl.querySelector("#ground");
  	var elementID = this.data.id;
  	var isHolding = false;

  	//pickUp()
  	element.addEventListener("click", function () {
  		if (!isHolding) {
  			//hide entity, now holding
			element.setAttribute('visible', false);
			inventory.push(elementID);
			isHolding = true;
			console.log("You picked up: " + elementID);
		}
  	});

  	//putDown()
  	ground.addEventListener('click', (event) => {
		if (isHolding && (elementID == inventory[0])) {
			//update location of entity
			findLocation = function(event) {
				var newLocation = event.detail.intersection.point;
				newLocation = newLocation.x + ", 1, " + newLocation.z;
				console.log(newLocation);
				element.setAttribute('position', newLocation);
			}
			ground.addEventListener('raycaster-intersected', findLocation(event));
			ground.removeEventListener('raycaster-intersected', findLocation(event));

			//make entity visible, no longer holding
			element.setAttribute('visible', true);
			inventory.shift();
			isHolding = false;
			console.log("You put down: " + elementID);
		}
	});

	//showInventory()
  	document.addEventListener('keypress', (event) => {
  		const keyName = event.key;
  		if (keyName == 'i') {
  			console.log(inventory);
  		} 
	});
  }
});