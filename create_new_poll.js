(function process( /*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {
	var data = request.body.data;
	var pollHelper = new x_snc_polls.PollData_Creator();
	var groupId = getUserGroupId(data.usergroup);

	// Create Poll record
	var pollRecord = pollHelper.createPoll(data, groupId);

	// Create question record and choices
	var questionData = data.questions;
	pollHelper.createQuestions(questionData, pollRecord.getUniqueValue());

	// Set Response Details
	var pollDetail = {
		number: pollRecord.number,
		name: pollRecord.name
	};
	response.setStatus(201);
	response.setLocation(request.url + "/" + pollRecord.getUniqueValue());
	response.setBody(pollDetail);

	// Helper function
	function getUserGroupId(groupName) {
		var groupRec = new GlideRecord("sys_user_group");
		groupRec.addQuery("name", groupName);
		groupRec.query();
		groupRec.next();
		return groupRec.getUniqueValue();
	}

})(request, response);