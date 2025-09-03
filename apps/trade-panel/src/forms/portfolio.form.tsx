import { zodResolver } from "@hookform/resolvers/zod";
import { PortfolioFormInput, portfolioFormSchema } from "@workspace/schemas/portfolio";
import { Input } from "@workspace/ui/components/input";
import { useForm } from "react-hook-form";

interface IPortfolioFormProps {
	id: string;
	onSubmit: (data: PortfolioFormInput) => void;
	defaultValues?: PortfolioFormInput;
}

export function PortfolioForm(props: IPortfolioFormProps) {
	const {
		id,
		onSubmit,
		defaultValues = {
			name: "",
			initialValue: "",
		},
	} = props;

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		resolver: zodResolver(portfolioFormSchema),
		defaultValues: {
			name: defaultValues.name,
			initialValue: defaultValues.initialValue.toString(),
		},
	});

	const handleOnSubmit = async (data: PortfolioFormInput) => {
		await onSubmit?.(data);
		reset();
	};

	return (
		<form id={id} onSubmit={handleSubmit(handleOnSubmit)}>
			<div className="grid gap-4">
				<div>
					<Input
						label="Name"
						placeholder="Bybit"
						className="uppercase"
						{...register("name")}
						error={errors.name?.message}
					/>
				</div>
				<div>
					<Input
						label="Initial Amount"
						placeholder="1000"
						type="number"
						step="0.01"
						min="0"
						{...register("initialValue")}
						error={errors.initialValue?.message}
					/>
				</div>
			</div>
		</form>
	);
}
