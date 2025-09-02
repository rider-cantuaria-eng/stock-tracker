import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";

export function FooterNewsletter() {
	return (
		<div>
			<h3 className="text-lg font-medium mb-4">Newsletter</h3>
			<div className="flex items-center gap-4">
				<Input placeholder="Enter your email" />
				<Button>Send</Button>
			</div>
		</div>
	);
}
