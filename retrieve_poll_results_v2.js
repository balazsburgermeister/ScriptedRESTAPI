(function process( /*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {
	var id = request.pathParams.poll_id;
	var pollHelper = new x_snc_polls.PollData_Retriever();
	var pollRecord = new GlideRecordSecure("x_snc_polls_poll");
	pollRecord.get(id);
	if (!pollRecord.isValidRecord()) {
		var err = new sn_ws_err.ServiceError();
		err.setStatus(404);
		err.setMessage("Cant find poll with id:" + id);
		err.setDetail("Valid sysId of record is required to retrieve results. To get valid sysId, use api/now/table/x_snc_polls_poll endpoint to get all valid polls");
		throw err;
	}

	var pollResponse = {
		name: pollRecord.getValue("name"),
		questions: pollHelper.getResultsByUser(id)
	};
	return pollResponse;
})(request, response);