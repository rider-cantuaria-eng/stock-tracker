import { zodResolver } from "@hookform/resolvers/zod";
import {
	tradeFormSchema,
	TTradeFormInput,
	TTradeFormRawInput,
} from "@workspace/schemas/trade";
import { DatePicker } from "@workspace/ui/components/date-picker";
import { Input } from "@workspace/ui/components/input";
import { useForm, Controller } from "react-hook-form";

interface ITradeFormProps {
	id: string;
	onSubmit: (data: TTradeFormInput) => void;
	defaultValues?: Partial<TTradeFormRawInput>;
}

export function TradeForm(props: ITradeFormProps) {
	const {
		id,
		onSubmit,
		defaultValues = {
			ticker: "",
			entryPrice: "",
			quantity: "",
			exitPrice: "",
			date: "",
			portfolioId: "",
		},
	} = props;

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		control,
	} = useForm<TTradeFormRawInput, unknown, TTradeFormInput>({
		resolver: zodResolver(tradeFormSchema),
		defaultValues: defaultValues,
	});

	const handleOnSubmit = async (data: TTradeFormInput) => {
		await onSubmit?.(data);
		reset();
	};
	return (
		<form id={id} onSubmit={handleSubmit(handleOnSubmit)}>
			<div className="grid grid-cols-2 gap-4">
				<div className="col-span-2">
					<Input
						label="Ticker"
						placeholder="GOOG"
						className="uppercase"
						{...register("ticker")}
						error={errors.ticker?.message}
					/>
				</div>
				<div>
					<Input
						label="Entry Price"
						placeholder="213.53"
						type="number"
						step="0.01"
						min="0"
						{...register("entryPrice")}
						error={errors.entryPrice?.message}
					/>
				</div>
				<div>
					<Input
						label="Exit Price"
						placeholder="213.33"
						type="number"
						step="0.01"
						min="0"
						{...register("exitPrice")}
						error={errors.exitPrice?.message}
					/>
				</div>
				<div>
					<Input
						label="Quantity"
						placeholder="20"
						type="number"
						step="0.01"
						min="0"
						{...register("quantity")}
						error={errors.quantity?.message}
					/>
				</div>
				<div>
					<Controller
						name="date"
						control={control}
						render={({ field }) => (
							<DatePicker
								label="Date of trade"
								value={field.value}
								onChange={field.onChange}
								error={errors.date?.message}
								showTime={true}
							/>
						)}
					/>
				</div>
			</div>
		</form>
	);
}
