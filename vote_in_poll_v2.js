(function process( /*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {

	var pollId = request.pathParams.poll_id;
	var pollHelper = new x_snc_polls.PollData_Creator();

	// Validate if poll record exists
	var pollRecord = new GlideRecordSecure("x_snc_polls_poll");
	pollRecord.get(pollId);
	if (!pollRecord.isValidRecord()) {
		throw new sn_ws_err.NotFoundError("Poll Not found");
	}

	var voteData = request.body.data.votes;

	// Verify if already voted
	var pollResponseRecord = new GlideRecordSecure("x_snc_polls_poll_response");
	pollResponseRecord.addQuery("poll", pollId);
	pollResponseRecord.addQuery("sys_created_by", gs.getUserName());
	pollResponseRecord.query();
	if (pollResponseRecord.next()) {
		throw new sn_ws_err.ConflictError("Already voted");
	}

	// Record votes
	pollHelper.voteInPoll(voteData, pollId);

	// Set response details
	response.setStatus(201);
	response.setContentType("application/json");
	var responseBody = '{"message":"Voting successful"}';
	response.getStreamWriter().writeString(responseBody);
})(request, response);