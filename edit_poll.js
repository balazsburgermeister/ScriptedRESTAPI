(function process( /*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {
	var pollId = request.pathParams.poll_id;
	var pollHelper = new x_snc_polls.PollData_Creator();

	// Validate if poll record exists
	var pollRecord = new GlideRecord("x_snc_polls_poll");
	pollRecord.get(pollId);

	var questionData = request.body.data;

	// Create question record and choices
	pollHelper.createQuestions(questionData, pollId);

	// Set response details
	response.setStatus(204);
})(request, response);