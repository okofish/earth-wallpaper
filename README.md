# earth-wallpaper

earth-wallpaper sets the latest image from the NASA EPIC camera onboard the NOAA DSCOVR spacecraft as your macOS wallpaper. Install with `npm install earth-wallpaper -g` to access the command-line tool:

    earth-wallpaper - Set the latest image from the NASA EPIC camera onboard the
    NOAA DSCOVR spacecraft as your macOS wallpaper

    Options:
      -f, --force           Force wallpaper update                         [boolean]
      --type, --imageType   Satellite image type
                               [choices: "natural", "enhanced"] [default: "natural"]
      --format, --fileType  File format     [choices: "jpg", "png"] [default: "jpg"]
      --apikey, --apiKey    NASA API key                                    [string]
      -h                    Show help                                      [boolean]

If the wallpaper image is appearing too big or too small, set the placement settings in Desktop & Screen Saver in System Preferences to Fit to Screen, with a black background.

Add to your crontab to run hourly:

    0 * * * * /usr/local/bin/earth-wallpaper