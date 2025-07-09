# Hero Video Background Files

## Video File Requirements

To add video backgrounds to the Hero section, place your video files in this directory with the following specifications:

### File Names
- `hero-climate-action.mp4` (Primary format)
- `hero-climate-action.webm` (Fallback format)

### Video Specifications
- **Duration**: 15-30 seconds (loops automatically)
- **Resolution**: 1920x1080 minimum for desktop
- **File Size**: Keep under 10MB for optimal performance
- **Content**: Natural scenes (forests, wind turbines, solar panels, ocean waves)
- **Characteristics**: Silent, looping, suitable for background

### Recommended Content Themes
1. **Forest & Nature**: Dense green forests, mountain landscapes
2. **Renewable Energy**: Wind turbines rotating, solar panel arrays
3. **Ocean & Water**: Calm ocean waves, pristine waterscapes
4. **Technology & Innovation**: Clean energy infrastructure
5. **Abstract Motion**: Subtle particle effects, gradient movements

### Encoding Settings
- **Codec**: H.264 for MP4, VP9 for WebM
- **Frame Rate**: 24-30 fps
- **Bitrate**: 2-5 Mbps for good quality/size balance
- **Audio**: None (will be muted anyway)

### Performance Notes
- Videos will automatically fallback to static images on mobile devices
- Slow network connections will also use static images
- Poster frame is shown during loading

### Current Fallback
Without video files, the component uses a high-quality static image:
`https://images.unsplash.com/photo-1441974231531-c6227db76b6e`

### Testing
After adding video files:
1. Test on desktop browsers (Chrome, Firefox, Safari)
2. Verify mobile fallback to static images
3. Check loading performance with network throttling
4. Ensure smooth looping without visible seams