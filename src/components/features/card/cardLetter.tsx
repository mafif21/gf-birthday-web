import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Categories } from "@/data/letter";

interface cardLetterProps {
  categories: number[];
  message: string;
}

export const CardLetter = ({ categories, message }: cardLetterProps) => {
  return (
    <div>
      <Card>
        <CardContent>
          <p>{message}</p>
        </CardContent>

        <CardFooter>
          <div className="flex gap-1">
            {categories.map((categoryId, index) => {
              const category = Categories.find(
                (c) => c.idCategory === categoryId
              );
              if (!category) return null;

              return (
                <Badge
                  key={index}
                  style={{
                    backgroundColor: category.bgColor,
                    borderColor: category.borderColor,
                    borderWidth: "1px",
                    borderStyle: "solid",
                  }}
                  className="text-xs px-2 py-1 rounded text-slate-700"
                >
                  {category.name}
                </Badge>
              );
            })}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
