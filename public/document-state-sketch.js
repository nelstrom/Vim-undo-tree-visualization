new DocumentState({
	timelines: [
		{ points: 's1,s2,s3,s4' },
		{ points: 's1,s2,s5,s6', active: true }
	],
	nodes: [
		{ position: 's1' },
		{ position: 's2' },
		{ position: 's3' },
		{ position: 's4' },
		{ position: 's5' },
		{ position: 's6', active: true }
	]
});

12:
	timelineOriginal:
		['s1','s2','s3','s4']
	timelineRevised:
		['s1','s2','s5','s6']
	activeTrack:
		'timelineRevised'
	nodes:
		active: () -> states[12].nodes[5]
		0:
			state: 'off'
			position: 's1'
		1:
			state: 'off'
			position: 's2'
		2:
			state: 'off'
			position: 's3'
		3:
			state: 'off'
			position: 's4'
		4:
			state: 'off'
			position: 's5'
		5:
			state: 'on'
			position: 's6'
