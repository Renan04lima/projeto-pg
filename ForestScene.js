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

		console.log('loadResults', loadResults);

		/* CRIANDO OBJETOS NA CENA */

		// Adicionando tronco da primeira árvore
		var mesh = loadResults.Models.ForestModel.meshes[0];
		me.Tree1TrunkMesh = new Model(
			me.gl,
			mesh.vertices,
			[].concat.apply([], mesh.faces),
			mesh.normals,
			vec4.fromValues(0.5, 0.2, 0.0, 1.0)
		);
		mat4.rotate(
			me.Tree1TrunkMesh.world, me.Tree1TrunkMesh.world,
			glMatrix.toRadian(90.0),
			vec3.fromValues(1, 0, 0)
		);
		mat4.translate(
			me.Tree1TrunkMesh.world, me.Tree1TrunkMesh.world,
			vec4.fromValues(0.0, 0.0, 15)
		);
		
		// Adicionando folhagem da primeira árvore
		var mesh = loadResults.Models.ForestModel.meshes[1];
		me.Tree1LeafsMesh = new Model(
			me.gl,
			mesh.vertices,
			[].concat.apply([], mesh.faces),
			mesh.normals,
			vec4.fromValues(0.5, 1.0, 0.1, 1.0)
		);
		mat4.rotate(
			me.Tree1LeafsMesh.world, me.Tree1LeafsMesh.world,
			glMatrix.toRadian(90.0),
			vec3.fromValues(1, 0, 0)
		);
		mat4.translate(
			me.Tree1LeafsMesh.world, me.Tree1LeafsMesh.world,
			vec4.fromValues(0.0, 0.0, 15)
		);
		
		// Adicionando tronco da segunda árvore
		var mesh = loadResults.Models.ForestModel.meshes[2];
		me.Tree2TrunkMesh = new Model(
			me.gl,
			mesh.vertices,
			[].concat.apply([], mesh.faces),
			mesh.normals,
			vec4.fromValues(0.5, 0.2, 0.0, 1.0)
		);
		mat4.rotate(
			me.Tree2TrunkMesh.world, me.Tree2TrunkMesh.world,
			glMatrix.toRadian(90.0),
			vec3.fromValues(1, 0, 0)
		);
		mat4.translate(
			me.Tree2TrunkMesh.world, me.Tree2TrunkMesh.world,
			vec4.fromValues(0.0, 0.0, 15)
		);
		
		// Adicionando folhagem da segunda árvore
		var mesh = loadResults.Models.ForestModel.meshes[3];
		me.Tree2LeafsMesh = new Model(
			me.gl,
			mesh.vertices,
			[].concat.apply([], mesh.faces),
			mesh.normals,
			vec4.fromValues(0.5, 1.0, 0.1, 1.0)
		);
		mat4.rotate(
			me.Tree2LeafsMesh.world, me.Tree2LeafsMesh.world,
			glMatrix.toRadian(90.0),
			vec3.fromValues(1, 0, 0)
		);
		mat4.translate(
			me.Tree2LeafsMesh.world, me.Tree2LeafsMesh.world,
			vec4.fromValues(0.0, 0.0, 15)
		);

		// Adicionando primeira rocha
		var mesh = loadResults.Models.ForestModel.meshes[4];
		me.Rock1Mesh = new Model(
			me.gl,
			mesh.vertices,
			[].concat.apply([], mesh.faces),
			mesh.normals,
			vec4.fromValues(0.2, 0.2, 0.2, 1.0)
		);
		mat4.rotate(
			me.Rock1Mesh.world, me.Rock1Mesh.world,
			glMatrix.toRadian(90.0),
			vec3.fromValues(1, 0, 0)
		);
		mat4.translate(
			me.Rock1Mesh.world, me.Rock1Mesh.world,
			vec4.fromValues(0.0, 0.0, 10)
		);

		// Adicionando base do primeiro cogumelo
		var mesh = loadResults.Models.ForestModel.meshes[12];
		me.Mushroom1BottomMesh = new Model(
			me.gl,
			mesh.vertices,
			[].concat.apply([], mesh.faces),
			mesh.normals,
			vec4.fromValues(0.9, 0.8, 0.7, 1.0)
		);
		mat4.rotate(
			me.Mushroom1BottomMesh.world, me.Mushroom1BottomMesh.world,
			glMatrix.toRadian(90.0),
			vec3.fromValues(1, 0, 0)
		);
		mat4.translate(
			me.Mushroom1BottomMesh.world, me.Mushroom1BottomMesh.world,
			vec4.fromValues(5.8, 1.2, 6.6)
		);
		
		// Adicionando topo do primeiro cogumelo
		var mesh = loadResults.Models.ForestModel.meshes[13];
		me.Mushroom1TopMesh = new Model(
			me.gl,
			mesh.vertices,
			[].concat.apply([], mesh.faces),
			mesh.normals,
			vec4.fromValues(1.0, 0.2, 0.2, 1.0)
		);
		mat4.rotate(
			me.Mushroom1TopMesh.world, me.Mushroom1TopMesh.world,
			glMatrix.toRadian(90.0),
			vec3.fromValues(1, 0, 0)
		);
		mat4.translate(
			me.Mushroom1TopMesh.world, me.Mushroom1TopMesh.world,
			vec4.fromValues(5.8, 1.2, 6.6)
		);
		
		// Adicionando pontos brancos no topo do primeiro cogumelo
		var mesh = loadResults.Models.ForestModel.meshes[14];
		me.Mushroom1TopDotsMesh = new Model(
			me.gl,
			mesh.vertices,
			[].concat.apply([], mesh.faces),
			mesh.normals,
			vec4.fromValues(1.0, 1.0, 1.0, 1.0)
		);
		mat4.rotate(
			me.Mushroom1TopDotsMesh.world, me.Mushroom1TopDotsMesh.world,
			glMatrix.toRadian(90.0),
			vec3.fromValues(1, 0, 0)
		);
		mat4.translate(
			me.Mushroom1TopDotsMesh.world, me.Mushroom1TopDotsMesh.world,
			vec4.fromValues(5.8, 1.2, 6.6)
		);

		// Adicionando a base do segundo cogumelo
		var mesh = loadResults.Models.ForestModel.meshes[6];
		me.Mushroom2BottomMesh = new Model(
			me.gl,
			mesh.vertices,
			[].concat.apply([], mesh.faces),
			mesh.normals,
			vec4.fromValues(0.960, 0.864, 0.547, 1.0)
		);
		mat4.rotate(
			me.Mushroom2BottomMesh.world, me.Mushroom2BottomMesh.world,
			glMatrix.toRadian(90.0),
			vec3.fromValues(1, 0, -0.2)
		);
		mat4.translate(
			me.Mushroom2BottomMesh.world, me.Mushroom2BottomMesh.world,
			vec4.fromValues(7.8, 0.64, 6.7)
		);

		// Adicionando o topo do segundo cogumelo
		var mesh = loadResults.Models.ForestModel.meshes[7];
		me.Mushroom2TopMesh = new Model(
			me.gl,
			mesh.vertices,
			[].concat.apply([], mesh.faces),
			mesh.normals,
			vec4.fromValues(0.920, 0.609, 0.202, 1.0)
		);
		mat4.rotate(
			me.Mushroom2TopMesh.world, me.Mushroom2TopMesh.world,
			glMatrix.toRadian(90.0),
			vec3.fromValues(1, 0, -0.2)
		);
		mat4.translate(
			me.Mushroom2TopMesh.world, me.Mushroom2TopMesh.world,
			vec4.fromValues(7.8, 0.64, 6.7)
		);
		
		// Adicionando o primeiro arbusto
		var mesh = loadResults.Models.ForestModel.meshes[10];
		me.Bush1Mesh = new Model(
			me.gl,
			mesh.vertices,
			[].concat.apply([], mesh.faces),
			mesh.normals,
			vec4.fromValues(0.5, 1.0, 0.1, 1.0)
		);
		mat4.rotate(
			me.Bush1Mesh.world, me.Bush1Mesh.world,
			glMatrix.toRadian(90.0),
			vec3.fromValues(1, 0, 0)
		);
		mat4.translate(
			me.Bush1Mesh.world, me.Bush1Mesh.world,
			vec4.fromValues(-3.1, 0.0, 7.4)
		);

		var mesh = loadResults.Models.ForestModel.meshes[30];
		me.Stump30Mesh = new Model(
			me.gl,
			mesh.vertices,
			[].concat.apply([], mesh.faces),
			mesh.normals,
			vec4.fromValues(0.5, 0.2, 0.0, 1.0)
		);
		mat4.rotate(
			me.Stump30Mesh.world, me.Stump30Mesh.world,
			glMatrix.toRadian(90.0),
			vec3.fromValues(1, 0.1, 0)
		);
		mat4.translate(
			me.Stump30Mesh.world, me.Stump30Mesh.world,
			vec4.fromValues(-7.5, -0.5, 3)
		);

		var mesh = loadResults.Models.ForestModel.meshes[31];
		me.StumpMarrow31Mesh = new Model(
			me.gl,
			mesh.vertices,
			[].concat.apply([], mesh.faces),
			mesh.normals,
			vec4.fromValues(0.9, 0.8, 0.7, 1.0)
		);
		mat4.rotate(
			me.StumpMarrow31Mesh.world, me.StumpMarrow31Mesh.world,
			glMatrix.toRadian(90.0),
			vec3.fromValues(1, 0.1, 0)
		);
		mat4.translate(
			me.StumpMarrow31Mesh.world, me.StumpMarrow31Mesh.world,
			vec4.fromValues(-7.5, -0.5, 3)
		);

		var mesh = loadResults.Models.ForestModel.meshes[32];
		me.Stump32Mesh = new Model(
			me.gl,
			mesh.vertices,
			[].concat.apply([], mesh.faces),
			mesh.normals,
			vec4.fromValues(0.5, 0.2, 0.0, 1.0)
		);
		mat4.rotate(
			me.Stump32Mesh.world, me.Stump32Mesh.world,
			glMatrix.toRadian(90.0),
			vec3.fromValues(1, 0.1, 0)
		);
		mat4.translate(
			me.Stump32Mesh.world, me.Stump32Mesh.world,
			vec4.fromValues(-7.5, -0.5, 3)
		);

		var mesh = loadResults.Models.ForestModel.meshes[33];
		me.Stump33Mesh = new Model(
			me.gl,
			mesh.vertices,
			[].concat.apply([], mesh.faces),
			mesh.normals,
			vec4.fromValues(0.5, 0.2, 0.0, 1.0)
		);
		mat4.rotate(
			me.Stump33Mesh.world, me.Stump33Mesh.world,
			glMatrix.toRadian(90.0),
			vec3.fromValues(1, 0.1, 0)
		);
		mat4.translate(
			me.Stump33Mesh.world, me.Stump33Mesh.world,
			vec4.fromValues(-7.5, -0.5, 3)
		);

		var mesh = loadResults.Models.ForestModel.meshes[34];
		me.Stump34Mesh = new Model(
			me.gl,
			mesh.vertices,
			[].concat.apply([], mesh.faces),
			mesh.normals,
			vec4.fromValues(0.5, 0.2, 0.0, 1.0)
		);
		mat4.rotate(
			me.Stump34Mesh.world, me.Stump34Mesh.world,
			glMatrix.toRadian(90.0),
			vec3.fromValues(1, 0.1, 0)
		);
		mat4.translate(
			me.Stump34Mesh.world, me.Stump34Mesh.world,
			vec4.fromValues(-7.5, -0.5, 3)
		);

		var mesh = loadResults.Models.ForestModel.meshes[35];
		me.StumpMarrow35Mesh = new Model(
			me.gl,
			mesh.vertices,
			[].concat.apply([], mesh.faces),
			mesh.normals,
			vec4.fromValues(0.9, 0.8, 0.7, 1.0)
		);
		mat4.rotate(
			me.StumpMarrow35Mesh.world, me.StumpMarrow35Mesh.world,
			glMatrix.toRadian(90.0),
			vec3.fromValues(1, 0.1, 0)
		);
		mat4.translate(
			me.StumpMarrow35Mesh.world, me.StumpMarrow35Mesh.world,
			vec4.fromValues(-7.5, -0.5, 3)
		);

		var mesh = loadResults.Models.ForestModel.meshes[36];
		me.Stump36Mesh = new Model(
			me.gl,
			mesh.vertices,
			[].concat.apply([], mesh.faces),
			mesh.normals,
			vec4.fromValues(0.5, 0.2, 0.0, 1.0)
		);
		mat4.rotate(
			me.Stump36Mesh.world, me.Stump36Mesh.world,
			glMatrix.toRadian(90.0),
			vec3.fromValues(1, 0.1, 0)
		);
		mat4.translate(
			me.Stump36Mesh.world, me.Stump36Mesh.world,
			vec4.fromValues(-7.5, -0.5, 3)
		);

		var mesh = loadResults.Models.ForestModel.meshes[37];
		me.Stump37Mesh = new Model(
			me.gl,
			mesh.vertices,
			[].concat.apply([], mesh.faces),
			mesh.normals,
			vec4.fromValues(0.5, 0.2, 0.0, 1.0)
		);
		mat4.rotate(
			me.Stump37Mesh.world, me.Stump37Mesh.world,
			glMatrix.toRadian(90.0),
			vec3.fromValues(1, 0.1, 0)
		);
		mat4.translate(
			me.Stump37Mesh.world, me.Stump37Mesh.world,
			vec4.fromValues(-7.5, -0.5, 3)
		);

		var mesh = loadResults.Models.ForestModel.meshes[38];
		me.Stump38Mesh = new Model(
			me.gl,
			mesh.vertices,
			[].concat.apply([], mesh.faces),
			mesh.normals,
			vec4.fromValues(0.5, 0.2, 0.0, 1.0)
		);
		mat4.rotate(
			me.Stump38Mesh.world, me.Stump38Mesh.world,
			glMatrix.toRadian(90.0),
			vec3.fromValues(1, 0.1, 0)
		);
		mat4.translate(
			me.Stump38Mesh.world, me.Stump38Mesh.world,
			vec4.fromValues(-7.5, -0.5, 3)
		);

		// Adicionando o segundo arbusto
		var mesh = loadResults.Models.ForestModel.meshes[11];
		me.Bush2Mesh = new Model(
			me.gl,
			mesh.vertices,
			[].concat.apply([], mesh.faces),
			mesh.normals,
			vec4.fromValues(0.5, 1.0, 0.1, 1.0)
		);
		mat4.rotate(
			me.Bush2Mesh.world, me.Bush2Mesh.world,
			glMatrix.toRadian(90.0),
			vec3.fromValues(1, 0, 0)
		);
		mat4.translate(
			me.Bush2Mesh.world, me.Bush2Mesh.world,
			vec4.fromValues(3.2, 0.0, 9.5)
		);

		// Adicionando a primeira grama
		var mesh = loadResults.Models.ForestModel.meshes[8];
		me.Grass1Mesh = new Model(
			me.gl,
			mesh.vertices,
			[].concat.apply([], mesh.faces),
			mesh.normals,
			vec4.fromValues(0.5, 1.0, 0.1, 1.0)
		);
		mat4.rotate(
			me.Grass1Mesh.world, me.Grass1Mesh.world,
			glMatrix.toRadian(90.0),
			vec3.fromValues(1, 0, -0.2)
		);
		mat4.translate(
			me.Grass1Mesh.world, me.Grass1Mesh.world,
			vec4.fromValues(6, 0.64, 6.6)
		);

		// Adicionando a segunda grama
		var mesh = loadResults.Models.ForestModel.meshes[9];
		me.Grass2Mesh = new Model(
			me.gl,
			mesh.vertices,
			[].concat.apply([], mesh.faces),
			mesh.normals,
			vec4.fromValues(0.5, 1.0, 0.1, 1.0)
		);
		mat4.rotate(
			me.Grass2Mesh.world, me.Grass2Mesh.world,
			glMatrix.toRadian(90.0),
			vec3.fromValues(1, 0, -0.2)
		);
		mat4.translate(
			me.Grass2Mesh.world, me.Grass2Mesh.world,
			vec4.fromValues(4.7, 0.64, 6.3)
		);
		
		/* VERIFICAÇÃO DO CARREGAMENTO DOS OBJETOS */
		if (!me.Tree1TrunkMesh) {
			cb('Failed to load tree 1 trunk mesh'); return;
		}
		if (!me.Tree1LeafsMesh) {
			cb('Failed to load tree 1 leafs mesh'); return;
		}
		if (!me.Tree2TrunkMesh) {
			cb('Failed to load tree 2 trunk mesh'); return;
		}
		if (!me.Tree2LeafsMesh) {
			cb('Failed to load tree 2 leafs mesh'); return;
		}
		if (!me.Rock1Mesh) {
			cb('Failed to load rock 1 mesh'); return;
		}
		if (!me.Mushroom1BottomMesh) {
			cb('Failed to load bottom of mushroom 1 mesh'); return;
		}
		if (!me.Mushroom1TopMesh) {
			cb('Failed to load top of mushroom 1 mesh'); return;
		}
		if (!me.Mushroom1TopDotsMesh) {
			cb('Failed to load dots on top of mushroom 1 mesh'); return;
		}
		if (!me.Mushroom2BottomMesh) {
			cb('Failed to load bottom of mushroom 2 mesh'); return;
		}
		if (!me.Mushroom2TopMesh) {
			cb('Failed to load top of mushroom 2 mesh'); return;
		}
		if (!me.Stump30Mesh) {
			cb('Failed to load stump component 30 mesh'); return;
		}
		if (!me.StumpMarrow31Mesh) {
			cb('Failed to load stump component 31 mesh'); return;
		}
		if (!me.Stump32Mesh) {
			cb('Failed to load stump component 32 mesh'); return;
		}
		if (!me.Stump33Mesh) {
			cb('Failed to load stump component 33 mesh'); return;
		}
		if (!me.Stump34Mesh) {
			cb('Failed to load stump component 34 mesh'); return;
		}
		if (!me.StumpMarrow35Mesh) {
			cb('Failed to load stump component 35 mesh'); return;
		}
		if (!me.Stump36Mesh) {
			cb('Failed to load stump component 36 mesh'); return;
		}
		if (!me.Stump37Mesh) {
			cb('Failed to load stump component 37 mesh'); return;
		}
		if (!me.Stump38Mesh) {
			cb('Failed to load stump component 38 mesh'); return;
		}
		if (!me.Bush1Mesh) {
			cb('Failed to load bush 1 mesh'); return;
		}
		if (!me.Bush2Mesh) {
			cb('Failed to load bush 2 mesh'); return;
		}
		if (!me.Grass1Mesh) {
			cb('Failed to load grass 1 mesh'); return;
		}
		if (!me.Grass2Mesh) {
			cb('Failed to load grass 2 mesh'); return;
		}

		// Vertices of the mushroom highlights
		var mushroomHighlightVertices = 
		[ // X, Y, Z
			// Top
			-0.07, 0.07, -0.07,   
			-0.07, 0.07, 0.07,    
			0.07, 0.07, 0.07,     
			0.07, 0.07, -0.07,    

			// Left
			-0.07, 0.07, 0.07,    
			-0.07, -0.07, 0.07,   
			-0.07, -0.07, -0.07,  
			-0.07, 0.07, -0.07,   

			// Right
			0.07, 0.07, 0.07,    
			0.07, -0.07, 0.07,   
			0.07, -0.07, -0.07,  
			0.07, 0.07, -0.07,   

			// Front
			0.07, 0.07, 0.07,    
			0.07, -0.07, 0.07,    
			-0.07, -0.07, 0.07,    
			-0.07, 0.07, 0.07,    

			// Back
			0.07, 0.07, -0.07,    
			0.07, -0.07, -0.07,    
			-0.07, -0.07, -0.07,    
			-0.07, 0.07, -0.07,    

			// Bottom
			-0.07, -0.07, -0.07,   
			-0.07, -0.07, 0.07,    
			0.07, -0.07, 0.07,     
			0.07, -0.07, -0.07,    
		];

		// Index array of the mushroom highlights
		var mushroomHighlightIndices =
		[
			// Top
			0, 1, 2,
			0, 2, 3,

			// Left
			5, 4, 6,
			6, 4, 7,

			// Right
			8, 9, 10,
			8, 10, 11,

			// Front
			13, 12, 14,
			15, 14, 12,

			// Back
			16, 17, 18,
			16, 18, 19,

			// Bottom
			21, 20, 22,
			22, 20, 23
		];

		me.MushroomHighlight1Mesh = new Model(
			me.gl,
			mushroomHighlightVertices,
			mushroomHighlightIndices,
			null,
			vec4.fromValues(1.0, 1.0, 0.0, 1.0)
		);

		me.MushroomHighlight2Mesh = new Model(
			me.gl,
			mushroomHighlightVertices,
			mushroomHighlightIndices,
			null,
			vec4.fromValues(1.0, 1.0, 0.0, 1.0)
		);

		me.MushroomHighlight3Mesh = new Model(
			me.gl,
			mushroomHighlightVertices,
			mushroomHighlightIndices,
			null,
			vec4.fromValues(1.0, 1.0, 0.0, 1.0)
		);

		mat4.translate(
			me.MushroomHighlight1Mesh.world, me.MushroomHighlight1Mesh.world,
			vec4.fromValues(2.75, -11.0, 1.65)
		);

		mat4.translate(
			me.MushroomHighlight2Mesh.world, me.MushroomHighlight2Mesh.world,
			vec4.fromValues(1.65, -11.0, 1.65)
		);

		mat4.translate(
			me.MushroomHighlight3Mesh.world, me.MushroomHighlight3Mesh.world,
			vec4.fromValues(2.15, -11.5, 1.65)
		);

		// Vertices of the mushroom highlights
		var floorVertices = 
		[ // X, Y, Z
			// Top
			-100.0, -100.0, 0.0,   
			-100.0,  100.0, 0.0,    
			 100.0, -100.0, 0.0,     
			 100.0,  100.0, 0.0,    

			// Left
			-100.0, 100.0,  0.0,    
			-100.0, 100.0, -1.0,   
			-100.0, -100.0, -1.0,   
			-100.0, -100.0,  0.0,    

			// Right
			100.0, -100.0,  0.0,  
			100.0, -100.0, -1.0,    
			100.0, 100.0, -1.0,  
			100.0, 100.0, 0.0,    

			// Front
			100.0, 100.0, 0.0,    
			100.0, 100.0, -1.0,    
			-100.0, 100.0, -1.0,    
			-100.0, 100.0,  0.0,    

			// Back
			-100.0, -100.0,  0.0,    
			-100.0, -100.0, -1.0,    
			 100.0, -100.0, -1.0,    
			 100.0, -100.0,  0.0,    

			// Bottom
			-100.0, -100.0, -1.0,   
			-100.0,  100.0, -1.0,    
			 100.0, -100.0, -1.0,     
			 100.0,  100.0, -1.0,   
		];

		// Index array of the mushroom highlights
		var floorIndices =
		[
			// Top
			0, 1, 2,
			0, 2, 3,

			// Left
			5, 4, 6,
			6, 4, 7,

			// Right
			8, 9, 10,
			8, 10, 11,

			// Front
			13, 12, 14,
			15, 14, 12,

			// Back
			16, 17, 18,
			16, 18, 19,

			// Bottom
			21, 20, 22,
			22, 20, 23
		];

		me.FloorMesh = new Model(
			me.gl,
			floorVertices,
			floorIndices,
			null,
			vec4.fromValues(0.221, 0.690, 0.104, 1.0)
		);

		me.Meshes = [
			me.Tree1TrunkMesh,
			me.Tree1LeafsMesh,
			me.Tree2TrunkMesh,
			me.Tree2LeafsMesh,
			me.Rock1Mesh,
			me.Mushroom1BottomMesh,
			me.Mushroom1TopMesh,
			me.Mushroom1TopDotsMesh,
			me.MushroomHighlight1Mesh,
			me.MushroomHighlight2Mesh,
			me.MushroomHighlight3Mesh,
			me.Mushroom2BottomMesh,
			me.Mushroom2TopMesh,
			me.Stump30Mesh,
			me.StumpMarrow31Mesh,
			me.Stump32Mesh,
			me.Stump33Mesh,
			me.Stump34Mesh,
			me.StumpMarrow35Mesh,
			me.Stump36Mesh,
			me.Stump37Mesh,
			me.Stump38Mesh,
			me.Bush1Mesh,
			me.Bush2Mesh,
			me.Grass1Mesh,
			me.Grass2Mesh,
			me.FloorMesh,
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
			meshColor: me.gl.getUniformLocation(me.demoProgram, 'meshColor'),
		};
		me.demoProgram.attribs = {
			vertPosition: me.gl.getAttribLocation(me.demoProgram, 'vertPosition'),
			vertNormal: me.gl.getAttribLocation(me.demoProgram, 'vertNormal'),
			vertTexCoord: me.gl.getAttribLocation(me.demoProgram, 'vertTexCoord'),
		};


		//
		// Logical Values
		//
		me.camera = new Camera(
			vec3.fromValues(3.7, -7.0, 1.5),
			vec3.fromValues(1.65, -11.0, 1.65),
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
	};

	me.MoveForwardSpeed = 3.5;
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
	
	/* Movimentação dos três cubos giratórios em torno do cogumelo vermelho */

	mat4.rotateZ(
		this.MushroomHighlight1Mesh.world, this.MushroomHighlight1Mesh.world,
		dt / 1000 * 2 * Math.PI * 1.0
	);

	mat4.rotateZ(
		this.MushroomHighlight2Mesh.world, this.MushroomHighlight2Mesh.world,
		dt / 1000 * 2 * Math.PI * 1.0
	);

	mat4.rotateZ(
		this.MushroomHighlight3Mesh.world, this.MushroomHighlight3Mesh.world,
		dt / 1000 * 2 * Math.PI * 1.0
	);

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

	this.camera.GetViewMatrix(this.viewMatrix);
};

ForestScene.prototype._Render = function () {
	var gl = this.gl;

	// Clear back buffer, set per-frame uniforms
	gl.enable(gl.CULL_FACE);
	gl.enable(gl.DEPTH_TEST);

	gl.viewport(0, 0, gl.canvas.clientWidth, gl.canvas.clientHeight);

	gl.clearColor(0.635, 0.834, 0.920, 1);
	gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);

	gl.useProgram(this.demoProgram);
	gl.uniformMatrix4fv(this.demoProgram.uniforms.mProj, gl.FALSE, this.projMatrix);
	gl.uniformMatrix4fv(this.demoProgram.uniforms.mView, gl.FALSE, this.viewMatrix);

	var ambientUniformLocation = gl.getUniformLocation(this.demoProgram, 'ambientLightIntensity');
	var sunlightDirUniformLocation = gl.getUniformLocation(this.demoProgram, 'sun.direction');
	var sunlightIntUniformLocation = gl.getUniformLocation(this.demoProgram, 'sun.color');

	gl.uniform3f(ambientUniformLocation, 0.2, 0.2, 0.2);
	gl.uniform3f(sunlightDirUniformLocation, -3.0, 17.0, 4.0);
	gl.uniform3f(sunlightIntUniformLocation, 0.9, 0.9, 0.9);

	// Draw meshes
	for (var i = 0; i < this.Meshes.length; i++) {
		// Per object uniforms
		gl.uniformMatrix4fv(
			this.demoProgram.uniforms.mWorld,
			gl.FALSE,
			this.Meshes[i].world
		);
		gl.uniform4fv(
			this.demoProgram.uniforms.meshColor,
			this.Meshes[i].color
		);

		// Buffer de vértice
		gl.bindBuffer(gl.ARRAY_BUFFER, this.Meshes[i].vbo);
		gl.vertexAttribPointer(
			this.demoProgram.attribs.vertPosition,
			3, gl.FLOAT, gl.FALSE,
			0, 0
		);
		gl.enableVertexAttribArray(this.demoProgram.attribs.vertPosition);
		
		// Buffer de normais
		gl.bindBuffer(gl.ARRAY_BUFFER, this.Meshes[i].nbo);
		gl.vertexAttribPointer(
			this.demoProgram.attribs.vertNormal,
			3, gl.FLOAT,
			gl.TRUE,
			0, 0
		);
		gl.enableVertexAttribArray(this.demoProgram.attribs.vertNormal);

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
	switch (e.code) {
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
	}
};

ForestScene.prototype._OnKeyUp = function (e) {
	switch (e.code) {
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
	}
}; 