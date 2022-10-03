'use strict';

var ForestScene = function (gl) {
	this.gl = gl;
};

ForestScene.prototype.Load = function (cb) {
	console.log('Loading scene');

	var me = this;

	async.parallel({
		Models: function (callback) {
			async.map({
				ForestModel: 'forest.json'
			}, LoadJSONResource, callback);
		},
		ShaderCode: function (callback) {
			async.map({
				'vertexShaderText': 'shaders/shader.vs.glsl',
				'fragmentShaderText': 'shaders/shader.fs.glsl',
			}, LoadTextResource, callback);
		}
	}, function (loadErrors, loadResults) {
		if (loadErrors) {
			cb(loadErrors);
			return;
		}

		console.log(loadResults);

		//
		// Create Model objects
		//
		var mesh = loadResults.Models.ForestModel.meshes[0];
		me.Tree1MeshTrunk = new Model(
			me.gl,
			mesh.vertices,
			[].concat.apply([], mesh.faces),
			mesh.normals,
			vec4.fromValues(0.8, 0.8, 1.0, 1.0)
		);
		mat4.rotate(
			me.Tree1MeshTrunk.world, me.Tree1MeshTrunk.world,
			glMatrix.toRadian(90.0),
			vec3.fromValues(1, 0, 0)
		);
		mat4.translate(
			me.Tree1MeshTrunk.world, me.Tree1MeshTrunk.world,
			vec4.fromValues(0.0, 0.0, 40)
		);

		var mesh = loadResults.Models.ForestModel.meshes[1];
		me.Tree1MeshLeafs = new Model(
			me.gl,
			mesh.vertices,
			[].concat.apply([], mesh.faces),
			mesh.normals,
			vec4.fromValues(0.8, 0.8, 1.0, 1.0)
		);
		mat4.rotate(
			me.Tree1MeshLeafs.world, me.Tree1MeshLeafs.world,
			glMatrix.toRadian(90.0),
			vec3.fromValues(1, 0, 0)
		);
		mat4.translate(
			me.Tree1MeshLeafs.world, me.Tree1MeshLeafs.world,
			vec4.fromValues(0.0, 0.0, 40)
		);

		if (!me.Tree1MeshTrunk) {
			cb('Failed to load tree 1 trunk mesh'); return;
		}
		if (!me.Tree1MeshLeafs) {
			cb('Failed to load tree 1 leafs mesh'); return;
		}

		me.Meshes = [
			me.Tree1MeshTrunk,
			me.Tree1MeshLeafs,
		];



		//
		// Create Shaders
		//
		me.demoProgram = CreateShaderProgram(
			me.gl, loadResults.ShaderCode.vertexShaderText,
			loadResults.ShaderCode.fragmentShaderText
		);
		if (me.demoProgram.error) {
			cb('No program ' + me.demoProgram.error); return;
		}

		me.demoProgram.uniforms = {
			mProj: me.gl.getUniformLocation(me.demoProgram, 'mProj'),
			mView: me.gl.getUniformLocation(me.demoProgram, 'mView'),
			mWorld: me.gl.getUniformLocation(me.demoProgram, 'mWorld'),
		};
		me.demoProgram.attribs = {
			vertPosition: me.gl.getAttribLocation(me.demoProgram, 'vertPosition'),
		};


		//
		// Logical Values
		//
		me.camera = new Camera(
			vec3.fromValues(0, 0, 1.85),
			vec3.fromValues(-0.3, -1, 1.85),
			vec3.fromValues(0, 0, 1)
		);

		me.projMatrix = mat4.create();
		me.viewMatrix = mat4.create();

		mat4.perspective(
			me.projMatrix,
			glMatrix.toRadian(90),
			me.gl.canvas.clientWidth / me.gl.canvas.clientHeight,
			0.35,
			1000.0
		);
		cb();
	});

	me.PressedKeys = {
		Up: false,
		Right: false,
		Down: false,
		Left: false,
		Forward: false,
		Back: false,

		RotLeft: false,
		RotRight: false,
	};

	me.MoveForwardSpeed = 3.5;
	me.RotateSpeed = 1.5;
	me.textureSize = getParameterByName('texSize') || 512;
};

ForestScene.prototype.Begin = function () {
	console.log('Beginning demo scene');

	var me = this;

	// Attach event listeners
	this.__ResizeWindowListener = this._OnResizeWindow.bind(this);
	this.__KeyDownWindowListener = this._OnKeyDown.bind(this);
	this.__KeyUpWindowListener = this._OnKeyUp.bind(this);

	AddEvent(window, 'resize', this.__ResizeWindowListener);
	AddEvent(window, 'keydown', this.__KeyDownWindowListener);
	AddEvent(window, 'keyup', this.__KeyUpWindowListener);
	
	// Render Loop
	var previousFrame = performance.now();
	var dt = 0;
	var loop = function (currentFrameTime) {
		dt = currentFrameTime - previousFrame;
		me._Update(dt);
		previousFrame = currentFrameTime;

		me._Render();
		me.nextFrameHandle = requestAnimationFrame(loop);
	};
	me.nextFrameHandle = requestAnimationFrame(loop);

	me._OnResizeWindow();
};


//
// Private Methods
//
ForestScene.prototype._Update = function (dt) {
	if (this.PressedKeys.Forward && !this.PressedKeys.Back) {
		this.camera.moveForward(dt / 1000 * this.MoveForwardSpeed);
	}

	if (this.PressedKeys.Back && !this.PressedKeys.Forward) {
		this.camera.moveForward(-dt / 1000 * this.MoveForwardSpeed);
	}

	if (this.PressedKeys.Right && !this.PressedKeys.Left) {
		this.camera.moveRight(dt / 1000 * this.MoveForwardSpeed);
	}

	if (this.PressedKeys.Left && !this.PressedKeys.Right) {
		this.camera.moveRight(-dt / 1000 * this.MoveForwardSpeed);
	}

	if (this.PressedKeys.Up && !this.PressedKeys.Down) {
		this.camera.moveUp(dt / 1000 * this.MoveForwardSpeed);
	}

	if (this.PressedKeys.Down && !this.PressedKeys.Up) {
		this.camera.moveUp(-dt / 1000 * this.MoveForwardSpeed);
	}

	if (this.PressedKeys.RotRight && !this.PressedKeys.RotLeft) {
		this.camera.rotateRight(-dt / 1000 * this.RotateSpeed);
	}

	if (this.PressedKeys.RotLeft && !this.PressedKeys.RotRight) {
		this.camera.rotateRight(dt / 1000 * this.RotateSpeed);
	}

	this.camera.GetViewMatrix(this.viewMatrix);
};

ForestScene.prototype._Render = function () {
	var gl = this.gl;

	// Clear back buffer, set per-frame uniforms
	gl.enable(gl.CULL_FACE);
	gl.enable(gl.DEPTH_TEST);

	gl.viewport(0, 0, gl.canvas.clientWidth, gl.canvas.clientHeight);

	gl.clearColor(0.7, 0.7, 0.7, 1);
	gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);

	gl.useProgram(this.demoProgram);
	gl.uniformMatrix4fv(this.demoProgram.uniforms.mProj, gl.FALSE, this.projMatrix);
	gl.uniformMatrix4fv(this.demoProgram.uniforms.mView, gl.FALSE, this.viewMatrix);

	// Draw meshes
	for (var i = 0; i < this.Meshes.length; i++) {
		// Per object uniforms
		gl.uniformMatrix4fv(
			this.demoProgram.uniforms.mWorld,
			gl.FALSE,
			this.Meshes[i].world
		);

		// Set attributes
		gl.bindBuffer(gl.ARRAY_BUFFER, this.Meshes[i].vbo);
		gl.vertexAttribPointer(
			this.demoProgram.attribs.vertPosition,
			3, gl.FLOAT, gl.FALSE,
			0, 0
		);
		gl.enableVertexAttribArray(this.demoProgram.attribs.vertPosition);
		gl.bindBuffer(gl.ARRAY_BUFFER, null);

		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.Meshes[i].ibo);
		gl.drawElements(gl.TRIANGLES, this.Meshes[i].nPoints, gl.UNSIGNED_SHORT, 0);
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
	}
};


//
// Event Listeners
//
ForestScene.prototype._OnResizeWindow = function () {
	var gl = this.gl;

	var targetHeight = window.innerWidth * 9 / 16;

	if (window.innerHeight > targetHeight) {
		// Center vertically
		gl.canvas.width = window.innerWidth;
		gl.canvas.height = targetHeight;
		gl.canvas.style.left = '0px';
		gl.canvas.style.top = (window.innerHeight - targetHeight) / 2 + 'px';
	} else {
		// Center horizontally
		gl.canvas.width = window.innerHeight * 16 / 9;
		gl.canvas.height = window.innerHeight;
		gl.canvas.style.left = (window.innerWidth - (gl.canvas.width)) / 2 + 'px';
		gl.canvas.style.top = '0px';
	}

	gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
};

ForestScene.prototype._OnKeyDown = function (e) {
	switch(e.code) {
		case 'KeyW':
			this.PressedKeys.Forward = true;
			break;
		case 'KeyA':
			this.PressedKeys.Left = true;
			break;
		case 'KeyD':
			this.PressedKeys.Right = true;
			break;
		case 'KeyS':
			this.PressedKeys.Back = true;
			break;
		case 'ArrowUp':
			this.PressedKeys.Up = true;
			break;
		case 'ArrowDown':
			this.PressedKeys.Down = true;
			break;
		case 'ArrowRight':
			this.PressedKeys.RotRight = true;
			break;
		case 'ArrowLeft':
			this.PressedKeys.RotLeft = true;
			break;
	}
};

ForestScene.prototype._OnKeyUp = function (e) {
	switch(e.code) {
		case 'KeyW':
			this.PressedKeys.Forward = false;
			break;
		case 'KeyA':
			this.PressedKeys.Left = false;
			break;
		case 'KeyD':
			this.PressedKeys.Right = false;
			break;
		case 'KeyS':
			this.PressedKeys.Back = false;
			break;
		case 'ArrowUp':
			this.PressedKeys.Up = false;
			break;
		case 'ArrowDown':
			this.PressedKeys.Down = false;
			break;
		case 'ArrowRight':
			this.PressedKeys.RotRight = false;
			break;
		case 'ArrowLeft':
			this.PressedKeys.RotLeft = false;
			break;
	}
};