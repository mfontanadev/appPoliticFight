
@if [%1] EQU [] (
	echo Use build.bat [versionnumber]
	echo Example: build.bat v2.1.15
) else (
	@set version=%1

	@echo Building version: %version%

	@echo Clean build dir.
	rd build\%version% /s /q

	@echo Create version dir.
	md build\%version%

	@echo Copy all files to version dir.
	md build\%version%\classes
	xcopy classes\*.* build\%version%\classes /s

	md build\%version%\data 
	xcopy data\*.* build\%version%\data /s

	md build\%version%\framework
	xcopy framework\*.* build\%version%\framework /s

	md build\%version%\img
	xcopy img\*.* build\%version%\img /s

	md build\%version%\lib
	xcopy lib\*.* build\%version%\lib /s

	md build\%version%\sounds
	xcopy sounds\*.* build\%version%\sounds /s

	copy index.html build\%version%
)

pause
