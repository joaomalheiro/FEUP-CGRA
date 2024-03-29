var degToRad = Math.PI / 180.0;

class LightingScene extends CGFscene
{
	constructor()
	{
		super();
	};

	//function that checks what keys are pressed and acts accordingly
	checkKeys() {
		var text="Keys pressed: ";
		var keysPressed=false;
		if (this.gui.isKeyPressed("KeyW")){
			text+=" W ";
			keysPressed=true;
			this.vehicle.moveForward(this.deltaTime);
		}
		if (this.gui.isKeyPressed("KeyS")){
			text+=" S ";
			keysPressed=true;
			this.vehicle.moveBackward(this.deltaTime);
		}
		if (this.gui.isKeyPressed("KeyA")){
			text+=" A ";
			keysPressed=true;

			this.vehicle.moveLeft(this.deltaTime);
		}
		if (this.gui.isKeyPressed("KeyD")){
			this.vehicle.moveRight(this.deltaTime);
		}
		if (this.gui.isKeyPressed("KeyG")){
			if (this.vehicle.x >= -1 && this.vehicle.x <=1 && this.vehicle.z <= -9 && this.vehicle.z >=-11){ {}
			this.vehicle.speed = 0;
			this.crane.animate(this.vehicle);
			this.vehicleGrab = 1;
			this.lock = true;
			} else console.log("The car is not in the right position");
		}
		if (this.gui.isKeyPressed("KeyJ")){
			this.vehicle.speed /= 1.1;
		}
		};

	init(application)
	{
		super.init(application);

		this.initCameras();

		this.initLights();

		this.enableTextures(true);

		this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
		this.gl.clearDepth(100.0);
		this.gl.enable(this.gl.DEPTH_TEST);
		this.gl.enable(this.gl.CULL_FACE);
		this.gl.depthFunc(this.gl.LEQUAL);

		this.axis = new CGFaxis(this);

		// Materials
		this.materialDefault = new CGFappearance(this);

		//minecraft Texture
		this.bodyAppearance = new CGFappearance(this);
   		this.bodyAppearance.loadTexture("../resources/images/stoneBrickMinecraft.png");
		this.bodyAppearance.setTextureWrap("REPEAT", "REPEAT");
		this.bodyAppearance.setAmbient(0.3,0.3,0.3,1);
		this.bodyAppearance.setDiffuse(0.6,0.6,0.6,1);
		this.bodyAppearance.setSpecular(0,0.2,0.8,1);
		this.bodyAppearance.setShininess(120);

		//ferrari texture
		this.fireAppearance = new CGFappearance(this);
   		this.fireAppearance.loadTexture("../resources/images/fire.png");
		this.fireAppearance.setAmbient(0.3,0.3,0.3,1);
		this.fireAppearance.setDiffuse(0.6,0.6,0.6,1);
		this.fireAppearance.setSpecular(0,0.2,0.8,1);
		this.fireAppearance.setShininess(120);

		//pure gold texture
		this.goldenAppearance = new CGFappearance(this);
   		this.goldenAppearance.loadTexture("../resources/images/golden.png");
		this.goldenAppearance.setAmbient(0.3,0.3,0.3,1);
		this.goldenAppearance.setDiffuse(0.6,0.6,0.6,1);
		this.goldenAppearance.setSpecular(0,0.2,0.8,1);
		this.goldenAppearance.setShininess(120);

		//constructors for the main objects in the scene
		this.vehicle = new MyVehicle(this);
		this.vehicleGrab = 0;
		this.terrain = new MyTerrain(this);
		this.crane = new MyCrane(this);

		this.light0 = true;
		this.light1= true;
		this.light2 = true;
		this.light3 = true;

		//helper bool to be able to control the interface
		this.axisOn = false;
		//to lock the keys while the car is mid air
		this.lock = false;

		this.vehicleAppearances = [this.materialDefault,this.bodyAppearance, this.fireAppearance, this.goldenAppearance];
		this.currVehicleAppearance = 0;

		//interface function that allows the button to turn on and off the axis display
		this.axisDisplay = function(){
		this.axisOn = !(this.axisOn);
		};

		this.firstTime = 1;
		this.setUpdatePeriod(1000 * 1/100);
	};

	initCameras()
	{
		this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
	};

	initLights()
	{
		this.setGlobalAmbientLight(0.5,0.5,0.5, 1.0);

		// Positions for four lights
		this.lights[0].setPosition(4, 6, 1, 1);
		this.lights[0].setAmbient(0, 0, 0, 1);
		this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[0].setSpecular(1,1,0,0);
		this.lights[0].enable();

		this.lights[1].setPosition(10.5, 6.0, 1.0, 1.0);
		this.lights[0].setAmbient(0, 0, 0, 1);
		this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[0].setSpecular(1,1,0,0);
		this.lights[1].enable();

		this.lights[2].setPosition(10.5, 6.0, 5.0, 1.0);
		this.lights[0].setAmbient(0, 0, 0, 1);
		this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[0].setSpecular(1,1,0,0);
		this.lights[2].enable();

		this.lights[3].setPosition(4, 6.0, 5.0, 1.0);
		this.lights[0].setAmbient(0, 0, 0, 1);
		this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[0].setSpecular(1,1,0,0);
		this.lights[3].enable();
	};

	update(currTime) {

		var time = Math.floor(currTime/1000);

		if(this.firstTime == 1){
      		this.lastTime = currTime;
      		this.firstTime=0;
    	}

		if(this.firstTime==0){
		  this.lastTime = this.lastTime;
		  this.deltaTime = currTime - this.lastTime;
		  this.lastTime = currTime;
		  if (!this.lock)
			this.checkKeys();
		this.vehicle.update();
		this.crane.update();
		this.terrain.update();
		}
	}

	updateLights()
	{
		for (var i = 0; i < this.lights.length; i++)
			this.lights[i].update();
	}

	display()
	{
		if(this.light0)
			this.lights[0].enable();
		else
			this.lights[0].disable();

		if(this.light1)
			this.lights[1].enable();
		else
			this.lights[1].disable();

		if(this.light2)
			this.lights[2].enable();
		else
			this.lights[2].disable();

		if(this.light3)
			this.lights[3].enable();
		else
			this.lights[3].disable();
		// ---- BEGIN Background, camera and axis setup

		// Clear image and depth buffer everytime we update the scene
		this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

		// Initialize Model-View matrix as identity (no transformation)
		this.updateProjectionMatrix();
		this.loadIdentity();

		// Apply transformations corresponding to the camera position relative to the origin
		this.applyViewMatrix();

		// Update all lights used
		this.updateLights();

		// Draw axis
		if (this.axisOn)
		this.axis.display();

		//crane display
		this.pushMatrix();
		this.crane.display();
		this.popMatrix();

		//car display, if grabbed, not display in the scene but in the crane
		if (this.vehicleGrab == 0) {
		this.pushMatrix();
		this.translate(0,1.2,0);
		this.vehicle.setAppearance(this.currVehicleAppearance);
		this.vehicle.display();
		this.popMatrix();
		}

		//terrain display
		this.pushMatrix();
		this.rotate(-1.57,1,0,0);
		this.scale(50,50,1);
		this.terrain.display();
		this.popMatrix();

		this.materialDefault.apply();

		// ---- END Background, camera and axis setup

		// ---- BEGIN Scene drawing section



		// ---- END Scene drawing section
	};
};
