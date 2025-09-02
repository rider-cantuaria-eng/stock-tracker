import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";

export function FooterNewsletter() {
	return (
		<div>
			<h3 className="text-lg font-medium mb-4">Newsletter</h3>
			<div className="flex items-center  my-4 gap-3">
				<Input placeholder="Enter your email" className="w-[250px]" />
				<Button>Send</Button>
			</div>
		</div>
	);
}
