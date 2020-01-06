// Class ViewFramer
function ViewFramer () 
{ 
	ViewFramer.prototype.initWith = function (_maze)
	{
	}

	ViewFramer.prototype.initWithReset = function (_maze)
	{
	}
	
	// 
	ViewFramer.prototype.handleInputs = function () 
	{ 
		
		m_framer.handleInputs();
	}  

	// 
	ViewFramer.prototype.implementGameLogic = function () 
	{ 
		m_framer.implementGameLogic();
	}  

	ViewFramer.prototype.render = function (_canvas, _context)
	{
		m_framer.render(_canvas, _context);
	}

	// ------------------------------------------
	// Behaviour
	// ------------------------------------------

	// ------------------------------------------
	// User actions
	// ------------------------------------------
}
