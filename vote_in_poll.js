(function process( /*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {

	var pollId = request.pathParams.poll_id;
	var pollHelper = new x_snc_polls.PollData_Creator();

	// Validate if poll record exists
	var pollRecord = new GlideRecord("x_snc_polls_poll");
	pollRecord.get(pollId);

	var voteData = request.body.data.votes;

	// Record votes
	pollHelper.voteInPoll(voteData, pollId);

	// Set response details
	response.setStatus(201);
	response.setContentType("application/json");
	var responseBody = '{"message":"Voting successful"}';
	response.getStreamWriter().writeString(responseBody);
})(request, response);