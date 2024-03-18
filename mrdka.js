const now = Date.now();
	const minutesAgo = now - 1000 * 60 * 1;

	let createdTimestamp  = 1710794853403;


	console.log(now)
	console.log(minutesAgo)

	if (!(createdTimestamp <= now - 1000 * 60 * 1)) {
		console.log("da");
	}
	