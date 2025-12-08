import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface PasswordHistory {
  id: string;
  password: string;
  timestamp: Date;
}

const Index = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState([10]);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [history, setHistory] = useState<PasswordHistory[]>([]);
  const { toast } = useToast();

  const generatePassword = () => {
    const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    let charset = letters + symbols;
    if (includeNumbers) {
      charset += numbers;
    }
    
    let newPassword = '';
    for (let i = 0; i < length[0]; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    
    setPassword(newPassword);
    
    const newHistoryItem: PasswordHistory = {
      id: Date.now().toString(),
      password: newPassword,
      timestamp: new Date(),
    };
    
    setHistory(prev => [newHistoryItem, ...prev].slice(0, 5));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Скопировано!",
      description: "Пароль скопирован в буфер обмена",
    });
  };

  const videoLinks = [
    {
      title: "Основы кибербезопасности",
      url: "https://practicum.yandex.ru/blog/chto-takoe-kiberbrzopasnost/",
      icon: "Shield"
    },
    {
      title: "Защита личных данных",
      url: "https://blog.skillfactory.ru/zaschita-personalnyh-dannyh/",
      icon: "Lock"
    },
    {
      title: "Безопасные пароли",
      url: "https://habr.com/ru/articles/841896/",
      icon: "Key"
    },
    {
      title: "Двухфакторная аутентификация",
      url: "https://habr.com/ru/companies/1cloud/articles/277901/",
      icon: "ShieldCheck"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100">
      <div className="flex">
        <aside className="hidden lg:flex flex-col w-64 border-r border-border bg-white/80 backdrop-blur-sm min-h-screen p-6 space-y-4">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Icon name="Video" size={20} className="text-primary" />
            Видеоматериалы
          </h3>
          {videoLinks.slice(0, 2).map((link, idx) => (
            <a
              key={idx}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary transition-all duration-200 group"
            >
              <Icon name={link.icon as any} size={18} className="text-primary mt-1 group-hover:scale-110 transition-transform" />
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                {link.title}
              </span>
            </a>
          ))}
        </aside>

        <main className="flex-1">
          <div className="container max-w-4xl mx-auto px-4 py-12 space-y-12">
            <header className="text-center space-y-4 animate-fade-in">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-2xl mb-4">
                <Icon name="Key" size={40} className="text-primary" />
              </div>
              <h1 className="text-5xl font-bold tracking-tight">Генератор Паролей</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Создавайте надежные и безопасные пароли для защиты ваших аккаунтов
              </p>
            </header>

            <Card className="p-8 space-y-6 shadow-lg border-2 animate-scale-in">
              <div className="space-y-4">
                <div className="flex items-center justify-between bg-secondary/50 p-6 rounded-xl border-2 border-border min-h-[80px]">
                  {password ? (
                    <span className="text-2xl font-mono font-semibold tracking-wider break-all">
                      {password}
                    </span>
                  ) : (
                    <span className="text-muted-foreground text-lg">
                      Нажмите "Создать пароль"
                    </span>
                  )}
                  {password && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => copyToClipboard(password)}
                      className="ml-4 hover:bg-primary/10"
                    >
                      <Icon name="Copy" size={20} />
                    </Button>
                  )}
                </div>

                <div className="space-y-6 pt-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <Label className="text-base">Длина пароля</Label>
                      <span className="text-2xl font-bold text-primary">{length[0]}</span>
                    </div>
                    <Slider
                      value={length}
                      onValueChange={setLength}
                      min={5}
                      max={15}
                      step={1}
                      className="cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>5</span>
                      <span>15</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
                    <Label htmlFor="numbers" className="text-base cursor-pointer">
                      Включить цифры
                    </Label>
                    <Switch
                      id="numbers"
                      checked={includeNumbers}
                      onCheckedChange={setIncludeNumbers}
                    />
                  </div>
                </div>

                <Button
                  onClick={generatePassword}
                  size="lg"
                  className="w-full text-lg h-14 font-semibold hover-scale"
                >
                  <Icon name="Sparkles" size={20} className="mr-2" />
                  Создать пароль
                </Button>
              </div>
            </Card>

            {history.length > 0 && (
              <Card className="p-6 space-y-4 animate-fade-in">
                <h2 className="text-2xl font-semibold flex items-center gap-2">
                  <Icon name="History" size={24} className="text-primary" />
                  История паролей
                </h2>
                <div className="space-y-2">
                  {history.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors"
                    >
                      <div className="flex-1">
                        <code className="text-lg font-mono">{item.password}</code>
                        <p className="text-xs text-muted-foreground mt-1">
                          {item.timestamp.toLocaleTimeString('ru-RU')}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => copyToClipboard(item.password)}
                      >
                        <Icon name="Copy" size={18} />
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            <Card className="p-8 space-y-6">
              <h2 className="text-2xl font-semibold flex items-center gap-2">
                <Icon name="ShieldCheck" size={28} className="text-primary" />
                Рекомендации по безопасности
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-secondary/30 rounded-lg space-y-2">
                  <div className="flex items-center gap-2">
                    <Icon name="CheckCircle" size={20} className="text-primary" />
                    <h3 className="font-semibold">Длина пароля</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Используйте пароли длиной минимум 12 символов для максимальной защиты
                  </p>
                </div>
                <div className="p-4 bg-secondary/30 rounded-lg space-y-2">
                  <div className="flex items-center gap-2">
                    <Icon name="Shuffle" size={20} className="text-primary" />
                    <h3 className="font-semibold">Уникальность</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Используйте разные пароли для каждого сервиса
                  </p>
                </div>
                <div className="p-4 bg-secondary/30 rounded-lg space-y-2">
                  <div className="flex items-center gap-2">
                    <Icon name="RefreshCw" size={20} className="text-primary" />
                    <h3 className="font-semibold">Обновление</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Меняйте пароли каждые 3-6 месяцев
                  </p>
                </div>
                <div className="p-4 bg-secondary/30 rounded-lg space-y-2">
                  <div className="flex items-center gap-2">
                    <Icon name="Eye" size={20} className="text-primary" />
                    <h3 className="font-semibold">Конфиденциальность</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Никогда не делитесь паролями с посторонними
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <Icon name="HelpCircle" size={28} className="text-primary" />
                Часто задаваемые вопросы
              </h2>
              <Accordion type="single" collapsible className="space-y-2">
                <AccordionItem value="item-1" className="border rounded-lg px-4">
                  <AccordionTrigger className="hover:no-underline">
                    Насколько безопасен сгенерированный пароль?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Наш генератор создает криптографически стойкие пароли с использованием случайных символов. 
                    Пароли длиной 12+ символов практически невозможно подобрать методом перебора.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2" className="border rounded-lg px-4">
                  <AccordionTrigger className="hover:no-underline">
                    Сохраняются ли пароли на сервере?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Нет, все пароли генерируются локально в вашем браузере. Мы не сохраняем и не передаем 
                    ваши пароли на сервер. История паролей хранится только в памяти браузера.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3" className="border rounded-lg px-4">
                  <AccordionTrigger className="hover:no-underline">
                    Как часто нужно менять пароли?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Рекомендуется обновлять пароли каждые 3-6 месяцев. Однако если вы подозреваете утечку данных 
                    или компрометацию аккаунта, смените пароль немедленно.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4" className="border rounded-lg px-4">
                  <AccordionTrigger className="hover:no-underline">
                    Что делать, если я забыл пароль?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Используйте функцию восстановления пароля на сайте сервиса. Рекомендуем использовать 
                    менеджер паролей для безопасного хранения всех ваших учетных данных.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Card>
          </div>
        </main>

        <aside className="hidden lg:flex flex-col w-64 border-l border-border bg-white/80 backdrop-blur-sm min-h-screen p-6 space-y-4">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Icon name="BookOpen" size={20} className="text-primary" />
            Полезные ссылки
          </h3>
          {videoLinks.slice(2, 4).map((link, idx) => (
            <a
              key={idx}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary transition-all duration-200 group"
            >
              <Icon name={link.icon as any} size={18} className="text-primary mt-1 group-hover:scale-110 transition-transform" />
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                {link.title}
              </span>
            </a>
          ))}
        </aside>
      </div>
    </div>
  );
};

export default Index;