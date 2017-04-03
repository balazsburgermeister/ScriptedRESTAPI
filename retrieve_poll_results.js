(function process( /*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {
	var id = request.pathParams.poll_id;
	var pollHelper = new x_snc_polls.PollData_Retriever();
	var pollRecord = new GlideRecordSecure("x_snc_polls_poll");
	pollRecord.get(id);
	if (!pollRecord.isValidRecord()) {
		throw new sn_ws_err.NotFoundError("Poll not found");
	}

	var pollResponse = {
		name: pollRecord.getValue("name"),
		questions: pollHelper.getResultsByUser(id)
	};
	return pollResponse;
})(request, response);