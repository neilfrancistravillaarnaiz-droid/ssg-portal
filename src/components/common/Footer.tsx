import { Bot, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
	return (
		<footer className="student-footer">
			<Link to="/student/assistant">
				<Bot size={17} />
				<span>AI Assistant</span>
			</Link>
			<Link to="/student/feedback">
				<MessageCircle size={17} />
				<span>Feedback</span>
			</Link>
		</footer>
	);
}
