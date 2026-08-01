// components/SocialIcons.jsx
import { FaSpotify, FaYoutube, FaTwitter, FaLinkedin, FaDiscord, FaFacebook, FaInstagram, FaPatreon, FaPinterest, FaTwitch, FaSoundcloud, FaLink } from "react-icons/fa";

export const PLATFORMS = [
    { id: 'spotify', name: 'Spotify', icon: FaSpotify },
    { id: 'youtube', name: 'YouTube', icon: FaYoutube },
    { id: 'twitter', name: 'Twitter', icon: FaTwitter },
    { id: 'linkedin', name: 'LinkedIn', icon: FaLinkedin },
    { id: 'discord', name: 'Discord', icon: FaDiscord },
    { id: 'facebook', name: 'Facebook', icon: FaFacebook },
    { id: 'instagram', name: 'Instagram', icon: FaInstagram },
    { id: 'patreon', name: 'Patreon', icon: FaPatreon },
    { id: 'pinterest', name: 'Pinterest', icon: FaPinterest },
    { id: 'twitch', name: 'Twitch', icon: FaTwitch },
    { id: 'soundcloud', name: 'SoundCloud', icon: FaSoundcloud },
];

export function PlatformIcon({ platform, className }) {
    switch (platform) {
        case 'spotify': return <FaSpotify className={className} />;
        case 'youtube': return <FaYoutube className={className} />;
        case 'twitter': return <FaTwitter className={className} />;
        case 'linkedin': return <FaLinkedin className={className} />;
        case 'discord': return <FaDiscord className={className} />;
        case 'facebook': return <FaFacebook className={className} />;
        case 'instagram': return <FaInstagram className={className} />;
        case 'patreon': return <FaPatreon className={className} />;
        case 'pinterest': return <FaPinterest className={className} />;
        case 'twitch': return <FaTwitch className={className} />;
        case 'soundcloud': return <FaSoundcloud className={className} />;
        default: return <FaLink className={className} />;
    }
}