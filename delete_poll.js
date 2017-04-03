(function process( /*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {
	var pollId = request.pathParams.poll_id;
	var pollRecord = new GlideRecordSecure("x_snc_polls_poll");
	pollRecord.get(pollId);
	if (pollRecord.isValidRecord()) {
		pollRecord.deleteRecord();
	}
	response.setStatus(204);
})(request, response);