// Class Editor
function Editor () 
{ 
	Editor.prototype.initWith = function ()
	{
		this.m_spriteIndex = 0;
	
		this.m_animationIndex = 0;
		this.m_arrAnimations = new Array();
		
		this.loadFrames(0);
	}
	
	// 
	Editor.prototype.handleInputs = function () 
	{ 
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
		}
	}  

	// 
	Editor.prototype.implementGameLogic = function () 
	{ 
	}  

	Editor.prototype.render = function (_canvas, _context)
	{
		this.renderSpriteSheet(_canvas, _context, this.m_arrAnimations[this.m_animationIndex]);
	}

	Editor.prototype.loadFrames = function(_spriteIndex)
	{
		var pObj = null; 
		var tmpAnimation = null;
		chClearArray(this.m_arrAnimations);
		
		for (var iAnim = 0; iAnim < gl_sprites_definition.actor_collection[_spriteIndex].animation_collection.length; iAnim++) 
		{
			tmpAnimation = gl_sprites_definition.actor_collection[_spriteIndex].animation_collection[iAnim];
			
			pObj = new Animation();
			pObj.initWith(tmpAnimation.id, 0, tmpAnimation.spriteSheet,tmpAnimation.x,tmpAnimation.y);
			
			for (var iFrames = 0; iFrames < tmpAnimation.frames.length; iFrames++) 
			{
				pObj.createFrame(
				tmpAnimation.frames[iFrames].x1,
				tmpAnimation.frames[iFrames].y1,
				tmpAnimation.frames[iFrames].x2,
				tmpAnimation.frames[iFrames].y2,
				tmpAnimation.frames[iFrames].offsetX,
				tmpAnimation.frames[iFrames].offsetY,
				tmpAnimation.frames[iFrames].incX,
				tmpAnimation.frames[iFrames].incY,
				tmpAnimation.frames[iFrames].duration);
			}
			
			this.m_arrAnimations.push(pObj); 
		}
		
		// Actualizar framer para que muestre el espritesheet asociado al personaje actual.
		m_framer.loadSpriteSheet(this.spriteSheetId());
	}
	
	Editor.prototype.renderSpriteSheet = function (_canvas, _context, _animation)
	{
		var px = 0;
		var py = 50;
			
		for (var i = 0; i < _animation.m_arrFrames.length; i++) 
		{
			px = px + 20;
			clipImageTransparent(_canvas, _context, m_resourceMngr.getImage(_animation.m_resourceId),
				_animation.m_arrFrames[i].m_x1, _animation.m_arrFrames[i].m_y1,
				_animation.m_arrFrames[i].m_w, _animation.m_arrFrames[i].m_h, 
				px, py,
				_animation.m_arrFrames[i].m_w, _animation.m_arrFrames[i].m_h,
				1,0); 
		}
	}

	
	// ------------------------------------------
	// Behaviour
	// ------------------------------------------
	Editor.prototype.stop = function ()
	{ 
		this.m_running = false;
	}

	Editor.prototype.start = function ()
	{ 
		this.m_running = true;
	}

	// ------------------------------------------
	// User actions
	// ------------------------------------------
	Editor.prototype.loadLevel = function (_levelIndex)
	{ 
		/*
		this.m_lev = this.getLevel(_levelIndex);

		if (this.m_lev != null)
		{
			// Create cell objects.
			chClearArray(this.m_arrObj);
		
			var pPlayer = new Hero();
			pPlayer.initWith(this.m_index, C_OBJ_TYPE_PLAYER_GUY, 0, 0);
			this.m_arrObj.push(pPlayer);
			this.m_index++;
		}
		else
		{
			msglog('ERROR, Editor.loadLevel: nivel' + _levelIndex.toString() + ' no cargado');
		}*/
	}

	Editor.prototype.addObj = function (_obj)
	{
		this.m_arrObj.push(_obj);
	}

	Editor.prototype.deleteObjByIndex = function (_index)
	{
		this.m_arrObj.splice(_index,1);
	}

	Editor.prototype.serialize = function (_classId, _objType)
	{
		var id = _classId * 10 + _objType;
		return id.toString();
	}
	
	Editor.prototype.getLevel = function (_levelIndex)
	{
		var level = '';
		var resultLevel = null;
		var levelIndex = -1;
		
		if (_levelIndex == 'EMPTY')
		{
			level = 'id:1' + '|';
			level+= 'persistenceName:'+ 'stored_level' + '|';
			level+= 'rows:14'+ '|';
			level+= 'cols:15'+ '|';
			level+= 'background: '+ C_IMG_BACKGROUND_1.toString() + '|';
			level+= 'matrix:';
			level+= '00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,';
			level+= '00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,';
			level+= '00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,';
			level+= '00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,';
			level+= '00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,';
			level+= '00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,';
			level+= '00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,';
			level+= '00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,';
			level+= '00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,';
			level+= '00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,';
			level+= '00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,';
			level+= '00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,';
			level+= '00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,';
			level+= '00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,';
			level+= '00,00,00,00,00,00,00,00,00,00,00,00,00,00,00';
			levelIndex = 0;
		}

		if (levelIndex != -1)
		{
			resultLevel = new Level();
			resultLevel.initWith_index(levelIndex);
			
			msglog('Level:' + resultLevel.serialize());
		}

		return resultLevel;
	}

	Editor.prototype.spriteSheetId = function ()
	{
		return gl_sprites_definition.actor_collection[this.m_spriteIndex].spriteSheet;
	}
	
	Editor.prototype.currentAnimation = function ()
	{
		return this.m_arrAnimations[this.m_animationIndex];
	}
}

