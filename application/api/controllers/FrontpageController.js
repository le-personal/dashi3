module.exports = {

	main: function main(req, res) {
		if (req.session.authenticated) {
	    return res.redirect("/d");
	  }
	  else {
	  	return res.redirect("/public");
	  }
	}
}