(function process( /*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {
	var id = request.pathParams.poll_id;
	var pollHelper = new x_snc_polls.PollData_Retriever();
	var pollRecord = new GlideRecord("x_snc_polls_poll");
	pollRecord.get(id);

	var pollResponse = {
		name: pollRecord.getValue("name"),
		questions: pollHelper.getQuestions(id).as_list,
	};
	return pollResponse;

})(request, response);