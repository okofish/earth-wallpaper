module.exports = function(path) {
  return `
tell application "Finder" to set dims to items 3 thru 4 of (get bounds of window of desktop)

tell application "Image Events"
  launch
  set Wallpaper to open "${path}"
	scale Wallpaper by factor 0.8
  pad Wallpaper to dimensions dims with pad color {0, 0, 0}
  save Wallpaper
  close Wallpaper
end tell

tell application "System Events"
    tell every desktop
        set picture rotation to 0
        set picture to "${path}"
    end tell
end tell`
}