// Class Framer
function Framer () 
{ 
	Framer.prototype.initWith = function ()
	{
		this.spriteSheet = new Decoration();
				
		this.loadSpriteSheet(m_editor.spriteSheetId());
	}
	
	// 
	Framer.prototype.handleInputs = function () 
	{ 
	/*
		if (m_keyboardMngr.isKeyDown(C_BUTTON_RIGHT_KEY) == true)
		{
			m_keyboardMngr.disableUntilKeyUp(C_BUTTON_RIGHT_KEY);
			this.m_animationIndex++;
			if (this.m_animationIndex >= gl_sprites_definition.actor_collection[0].animation_collection.length) 
			{
				this.m_animationIndex = gl_sprites_definition.actor_collection[0].animation_collection.length - 1;
			}
		}
		if (m_keyboardMngr.isKeyDown(C_BUTTON_UP_KEY) == true)
		{
			m_keyboardMngr.disableUntilKeyUp(C_BUTTON_UP_KEY);
			this.m_animationIndex=0;
			this.m_spriteIndex++;
			if (this.m_spriteIndex >= gl_sprites_definition.actor_collection.length) 
			{
				this.m_spriteIndex = gl_sprites_definition.actor_collection.length - 1;
			}
			this.loadFrames(this.m_spriteIndex);
		}
		if (m_keyboardMngr.isKeyDown(C_BUTTON_LEFT_KEY) == true)
		{
			m_keyboardMngr.disableUntilKeyUp(C_BUTTON_LEFT_KEY);
			this.m_animationIndex--;
			if (this.m_animationIndex < 0) 
				this.m_animationIndex = 0;
		}
		if (m_keyboardMngr.isKeyDown(C_BUTTON_DOWN_KEY) == true)
		{
			m_keyboardMngr.disableUntilKeyUp(C_BUTTON_DOWN_KEY);
			this.m_animationIndex=0;
			this.m_spriteIndex--;
			if (this.m_spriteIndex < 0) 
				this.m_spriteIndex = 0;
			this.loadFrames(this.m_spriteIndex);
		}*/
	}  

	// 
	Framer.prototype.implementGameLogic = function () 
	{ 
		if (m_mouseClick == true && m_keyboardMngr.isKeyDown(C_KEY_SHIFT) == true)
		{
			var dx = (m_mousePosX / m_canvas.width);
			var dy = (m_mousePosY / m_canvas.height);
			this.spriteSheet.m_x = this.spriteSheet.getWidth() * dx; 
			this.spriteSheet.m_y = this.spriteSheet.getHeight() * dy;

			// Corner CII (cuadrant II)
			if (m_mousePosX < 50 && m_mousePosY < 50)
			{
				this.spriteSheet.m_x = 0;
				this.spriteSheet.m_y = 0;
			}

			if (m_mousePosX > m_canvas.width - 50 && m_mousePosY < 50)
			{
				this.spriteSheet.m_x = chMax(this.spriteSheet.getWidth() - m_canvas.width, 0);
				this.spriteSheet.m_y = 0;
			}

			if (m_mousePosX < 50 && m_mousePosY > m_canvas.hright - 50)
			{
				this.spriteSheet.m_x = 0;
				this.spriteSheet.m_y = chMax(this.spriteSheet.getHight() - m_canvas.height, 0);;
			}

			if (m_mousePosX > m_canvas.width - 50 && m_mousePosY > m_canvas.hright - 50)
			{
				this.spriteSheet.m_x = chMax(this.spriteSheet.getWidth() - m_canvas.width, 0);
				this.spriteSheet.m_y = chMax(this.spriteSheet.getHight() - m_canvas.height, 0);
			}
		}
	}  

	Framer.prototype.render = function (_canvas, _context)
	{
		this.spriteSheet.renderOffset(_canvas, _context);
		
		// Render boxes
		var _animation = m_editor.currentAnimation();
		
		for (var i = 0; i < _animation.m_arrFrames.length; i++) 
		{
			renderRectangle(_canvas, _context, 
				_animation.m_arrFrames[i].m_x1, _animation.m_arrFrames[i].m_y1,
				_animation.m_arrFrames[i].m_w, _animation.m_arrFrames[i].m_h,
				'green');
		}
	}

	// ------------------------------------------
	// Behaviour
	// ------------------------------------------
	Framer.prototype.stop = function ()
	{ 
		this.m_running = false;
	}

	Framer.prototype.start = function ()
	{ 
		this.m_running = true;
	}

	// ------------------------------------------
	// User actions
	// ------------------------------------------
	Framer.prototype.loadSpriteSheet = function (_idSpriteSheet)
	{ 
		if (this.spriteSheet != null)
			this.spriteSheet.initWith(1, C_OBJ_LEVEL_BACKGROUND, _idSpriteSheet, 0, 0);
	}
}

