class MyPrism extends CGFobject
{
	constructor(scene, slices, stacks)
	{
		super(scene);

    this.slices = slices;
    this.stacks = stacks;

		this.initBuffers();
	};
  /*
  let c = 0;
  for (var j = 0; j <= stacks; j++) {
    this.vertices.push(0, 0, j);
    for (var i = 0; i < slices; i++) {
          this.vertices.push(Math.cos(2 * Math.PI * i / slices), r * Math.sin(2 * Math.PI * i / slices), j);

          this.indices.push(1 + j + j*slices + i);
          c++;
          if(c == 2){
            this.indices.push(j);
            c=0;
          }
    }
  }
*/
	initBuffers()
	{

    this.vertices = [];
    this.indices = [];
    this.normals = [];
		this.texCoords = [];

    for (var j = 0; j <= this.stacks; j++) {
      for (var i = 0; i < this.slices; i++) {
            this.vertices.push(Math.cos(2 * Math.PI * i / this.slices), Math.sin(2 * Math.PI * i / this.slices), j/this.stacks);
            this.vertices.push(Math.cos(2 * Math.PI * (i+1) / this.slices), Math.sin(2 * Math.PI * (i+1) / this.slices), j/this.stacks);

            this.normals.push(Math.cos(2 * Math.PI * i / this.slices + Math.PI / this.slices), Math.sin((2 * Math.PI * i / this.slices + Math.PI / this.slices)), 0);
            this.normals.push(Math.cos(2 * Math.PI * i / this.slices + Math.PI / this.slices), Math.sin((2 * Math.PI * i / this.slices + Math.PI / this.slices)), 0);

						this.texCoords.push(0+j%2, 0);
						this.texCoords.push(0+j%2, 1);
    }
  }

  var numPontos= 2*this.stacks*this.slices;

  for (let i =0; i < numPontos; i+=2 ){
    this.indices.push(i, i+1, i+1+this.slices*2);
    this.indices.push(i, i+1+this.slices*2, i+this.slices*2);
  }

	/*this.vertices.push(0, 0, 0);
	this.vertices.push(1, 0, 0);
	this.vertices.push(0, 1, 0);

	this.indices.push(numPontos, numPontos+1, numPontos+2);

	this.normals.push(0, 0, 1);
	this.normals.push(0, 0, 1);
	this.normals.push(0, 0, 1);

	this.texCoords.push(0,1);
	this.texCoords.push(1,1);
	this.texCoords.push(1,0);
	this.texCoords.push(0,0);*/

		this.primitiveType=this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	};
};
